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
import { ExportReportRequest } from 'proto/gen/export.pb';
import { ExportClient } from 'proto/gen/export.pbsc';
import { ReportsDetailComponent } from './components/reports-detail.component';
import { ReportType } from './core/enums/report-type';
import { MasterDetailModule, Module } from '@ag-grid-enterprise/all-modules';
import { ReportsActionCellComponent } from './components/reports-action-cell.component';
import { ReportService } from './core/services/report.service';
import { ReportCountResultDto, ReportFilterDto } from './core/models/report';

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

  public loading: boolean = false;

  public modules: Module[] = [MasterDetailModule];
  
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
      reportType:   new FormControl(0, Validators.required),
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

      rowData: [
        { total: 1000, reportType: 'Parking', date: '11/11/1111'}
      ],

      defaultColDef: {
        flex: 1,
        resizable: true,
      },

      columnDefs: [
        {
          headerName: 'Total',
          cellRenderer: 'agGroupCellRenderer',
          field: 'totalRecords',
          valueFormatter: ({ value }) => `${value} - Records Available`
        },
        {
          headerName: 'Report Type',
          field: 'reportType'
        },
        {
          headerName: 'Date',
          field: 'date'
        },
        {
          headerName: 'Action',
          field: 'action',
          cellRenderer: ReportsActionCellComponent
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
      page:     1,
      pageSize: this.reportsPaging.pageSize,
    };
    this.loadReportCounts(this.parkingLotId, this.reportsPaging);
  }

  public exportReport($event: any): void {
    this.form.markAllAsTouched();
    if(this.form.valid){
      const { fromDate, toDate, reportType } = this.form.value;
      this.exportService.exportReport(new ExportReportRequest({ 
        reportFromDate: fromDate,
        reportToDate:   toDate,
        reportType:     reportType
      }));
    }
  }

  private loadReportCounts(lotId: number, paging: Paging): void {
    this.loading = true;
    const { fromDate, toDate, reportType } = this.form.value;
    const filter: ReportFilterDto = {
      reportType: reportType as ReportType,
      fromDate:   fromDate.format('YYYY-MM-DD'),
      toDate:     toDate.format('YYYY-MM-DD'),
      filter: {
        paging:  paging,
        sorting: []
      },
    };
    this.reportService.getReportCountData(lotId, filter)
    .subscribe({
      next: (value: PagingResult<ReportCountResultDto>) => {
        this.reportsData  = value.records;
        this.totalReports = value.totalRecords;
        this.cdRef.markForCheck();
      },
      error: () => {
        console.log('error');
      },
      complete: () => {
        this.loading = true;
        console.log('complete');
      }
    });
  }

  ngOnDestroy(){

  }
}
