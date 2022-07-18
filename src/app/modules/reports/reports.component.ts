import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { FilterDto } from '@app/core/models/filter/filter';
import { Paging, PagingResult } from '@app/core/models/paging/paging';
import { Sorting } from '@app/core/models/sorting/sorting';
import { GridOptions } from 'ag-grid-community';
import * as luxon from 'luxon';
import * as moment from 'moment';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { ExportReportByDateRequest, ExportReportByPeriodRequest, ExportReportByPeriodResponse } from 'proto/gen/export.pb';
import { ExportClient } from 'proto/gen/export.pbsc';
import { ReportsDetailComponent } from './components/reports-detail.component';
import { ReportType } from './core/enums/report-type';
import { MasterDetailModule, Module } from '@ag-grid-enterprise/all-modules';
import { ReportsActionCellComponent } from './components/reports-action-cell.component';
import { ReportService } from './core/services/report.service';
import { ReportCountFilterDto, ReportCountResultDto, ReportFilterDto } from './core/models/report';
import * as Excel from 'exceljs';
import { from } from 'rxjs';

@AutoUnsubscribe()
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportsComponent implements OnInit, OnDestroy {
  private parkingLotId: number = 1;

  public form: FormGroup = new FormGroup<any>({});

  public reportTypes: any[] = [
    { id: 1, value: 'Parking Events'  },
    { id: 2, value: 'Parking Traffic' },
    { id: 3, value: 'Parking Payments'},
    { id: 4, value: 'User Activity'},
  ];

  public reportsGridOptions: any;

  public reportsData: ReportCountResultDto[] = [];
  
  public reportsPaging:  Paging = { page: 0, pageSize: 10 };
  public reportsSorting: Sorting[] = [];
  public totalReports:   number = 0;

  public loading: boolean   = false;
  public exporting: boolean = false;

  public modules: Module[] = [MasterDetailModule];
   
  private lastSearchedFilter: any = null;
  
  constructor(
    private cdRef: ChangeDetectorRef,
    private reportService: ReportService,
    private exportService: ExportClient
  ) {
    
  }

  ngOnInit(): void {
   this.initForm();
   this.initGrid();
   this.cdRef.markForCheck();
  }

  private initForm(): void {
    const now = moment();

    this.form = new FormGroup({
      reportType:   new FormControl(1, Validators.required),
      //filter:       new FormControl(''),
      fromDate:     new FormControl(now.clone().subtract(1, 'd'), Validators.required),
      toDate:       new FormControl(now, Validators.required),
    }, { updateOn: 'change'});
  }

  private initGrid(): void {
    this.reportsGridOptions = <GridOptions>{
      headerHeight: 40,
      rowHeight:    40,
      masterDetail: true,
      detailCellRendererFramework: ReportsDetailComponent,
      detailRowHeight: 500,

      rowData: [],

      context: {
        lotId: this.parkingLotId
      },

      defaultColDef: {
        flex: 1,
        resizable: true,
      },

      columnDefs: [
        { 
          headerName: 'Report №',
          flex: 0.5,
          field: 'row',
          sortable: false,
          valueFormatter: (params) => ((params.node?.rowIndex ?? 0) + 1 + this.reportsPaging.page * this.reportsPaging.pageSize)
        },
        {
          headerName: 'Total',
          field: 'totalRecords',
          cellRenderer:'agGroupCellRenderer',
          valueFormatter: ({ value }) => `${value} - Records Available`
        },
        {
          headerName: 'Report Type',
          field: 'reportType',
          valueFormatter: ({value}) => {
            return this.reportTypes.find(v => v.id === value)?.value;
          }
        },
        {
          headerName: 'Date',
          field: 'date',
          valueFormatter: ({value}) => {
            if(value)
              return moment(value).format('DD/MM/YYYY');
            return '';
          }
        },
        {
          headerName: 'Action',
          field: 'action',
          suppressMovable: true,
          maxWidth: 120,
          cellRendererFramework: ReportsActionCellComponent
        }
      ],

      onGridReady: (event) => {
        this.reportsGridOptions.api       = event.api;
        this.reportsGridOptions.columnApi = event.columnApi;
      }
    };
  }

  public reportsPagingChanges(event: PageEvent): void {
    this.reportsPaging = { 
      page:     event.pageIndex,
      pageSize: event.pageSize,
    };
    this.loadReportCounts(this.parkingLotId, this.reportsPaging);
  }

  public search($event: any): void {
    this.reportsPaging = { 
      page:     0,
      pageSize: 10,
    };
    this.loadReportCounts(this.parkingLotId, this.reportsPaging);
  }

  public exportAllReports($event: any): void {
    if(!this.loading && this.lastSearchedFilter != null && this.totalReports > 0){
      this.exporting = true;

      const { reportType, fromDate, toDate } = this.lastSearchedFilter;

      const workbook = new Excel.Workbook();

      const worksheet = workbook.addWorksheet();
      
      switch(reportType){
        case ReportType.ParkingEventReport: {
          worksheet.name = `Events Report ${''}`;
          worksheet.columns = [
              { header: 'Event Log Id', key: 'eventLogId', width: 40, numFmt: '@' },
              { header: 'Event Date',   key: 'eventDate',  width: 40, numFmt: '@' },
              { header: 'Event Name',   key: 'eventName',  width: 40 },
              { header: 'Event Id',     key: 'eventId',    width: 40 },
          ]
          break;
        }
      }

      this.exportService.exportReportByPeriod(new ExportReportByPeriodRequest({ 
          parkingLotId:   this.parkingLotId.toString(),
          reportType:     reportType,
          reportFromDate: fromDate,
          reportToDate:   toDate,
      })).subscribe({
        next: (chunk: ExportReportByPeriodResponse) => {
          let rows: any = [];
          console.log('NEW CHUNK: ', chunk)

          if(reportType === ReportType.ParkingEventReport){
            rows = chunk.parkingEventReport;
          }

          worksheet.addRows(rows);
        },
        error: (value) => {
          this.exporting = false;
          this.cdRef.markForCheck();
        },
        complete: async () => {
          this.exporting = false;
          this.cdRef.markForCheck();
          
          if(worksheet.rowCount > 0){
            const buffer: Excel.Buffer = await workbook.xlsx.writeBuffer();

            const blob: Blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});

            const fileName = `Report ${moment().format('DD-MM-YYYY HH-mm-ss')}`;
            
            const fileAnchor = document.createElement('a');
            fileAnchor.setAttribute('href', (window.webkitURL || window.URL).createObjectURL(blob));
            fileAnchor.setAttribute('download', fileName);
            fileAnchor.click();
            fileAnchor.remove();
          }
        }
      });
    }
  }

  private loadReportCounts(lotId: number, paging: Paging): void {
    this.loading = true;
    
    const { fromDate, toDate, reportType } = this.form.value;

    const searchFilter: ReportCountFilterDto = {
      reportType: reportType as ReportType,
      fromDate:   fromDate.format('YYYY-MM-DD'),
      toDate:     toDate.format('YYYY-MM-DD'),
      filter: { 
        paging: paging, sorting: []
      },
    };

    this.lastSearchedFilter = searchFilter;
    
    this.reportService.getReportCountData(lotId, searchFilter)
    .subscribe({
      next: (value: PagingResult<ReportCountResultDto>) => {
        this.reportsData  = value.records;
        this.totalReports = value.totalRecords;
      },
      error: () => {
        this.loading = false;
        this.cdRef.markForCheck();
      },
      complete: () => {
        this.loading = false;
        this.cdRef.markForCheck();
      }
    });
  }

  ngOnDestroy(){

  }
}
