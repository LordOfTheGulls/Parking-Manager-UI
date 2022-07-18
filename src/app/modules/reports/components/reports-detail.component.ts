import { OnInit, Component, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef} from "@angular/core";
import { EventDTO } from "@app/core/models/event";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { GridOptions, GridReadyEvent, ICellRendererParams } from "ag-grid-community";
import * as moment from "moment";
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";
import { ExportReportByDateRequest } from "proto/gen/export.pb";
import { ExportClient } from "proto/gen/export.pbsc";
import { ReportType } from "../core/enums/report-type";
import { ReportCountResultDto, ReportFilterDto, ReportResultDto } from "../core/models/report";
import { ReportService } from "../core/services/report.service";

@AutoUnsubscribe()
@Component({
    template: `
        <app-spinner [showSpinner]="loading"></app-spinner>

        <ag-grid-angular 
            id="reports-grid"
            class="ag-theme-balham"
            [gridOptions]="gridOptions" 
            [rowData]="reportsData"
            [overlayNoRowsTemplate]="'No Reports for this Date.'">
        </ag-grid-angular>
    `,
    styles: [`
        ag-grid-angular{
            width: 100%;
            height: 100%;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportsDetailComponent implements ICellRendererAngularComp, OnDestroy{
    public gridOptions: any;

    public reportsData: any;

    private reportType: ReportType = 0;

    private params: any;

    private lotId: number = 0;

    public loading: boolean = false;

    constructor(
        private reportService: ReportService,
        private cdRef: ChangeDetectorRef,
    ){

    }

    refresh(params: ICellRendererParams): boolean {
        const { reportType } = params.data;
        this.params     = params;
        this.reportType = reportType;
        return false;
    }

    agInit(params: ICellRendererParams): void {
        const { reportType, date } = params.data as ReportCountResultDto;
        const { lotId }            = params.context;
        
        this.params          = params;
        this.reportType      = reportType;
        this.lotId           = lotId;

        const allColDefs: any = {
            [ReportType.ParkingEventReport]: [
                { 
                    headerName: '',
                    flex: 0.2,
                    field: 'flag',
                    sortable: false,
                },
                { 
                    headerName: 'Event №',
                    flex: 0.5,
                    field: 'row',
                    sortable: false,
                    valueFormatter: (params: any) => (params.node?.rowIndex + 1)
                },
                { 
                    headerName: 'Event Log Id',
                    field: 'eventLogId',
                    flex: 0.5,
                    sortable: true,
                },
                { 
                    headerName: 'Event Date',
                    field: 'eventDate',
                    sort: 'desc',
                    sortable: true,
                    valueFormatter: ({value}: any) => {
                        if(value)
                          return moment(value).format('DD/MM/YYYY');
                        return '';
                    },
                },
                { 
                    headerName: 'Event Name',
                    field: 'eventName',
                    sortable: true,
                },
                { 
                    headerName: 'Event ID',
                    field: 'eventId',
                    hide: true
                  },
            ],
        };

        this.gridOptions = {
            headerHeight: 40,
            rowHeight: 40,
      
            rowData: [],
      
            defaultColDef: {
              flex: 1,
              resizable: false,
            },

            columnDefs: allColDefs[reportType],
            
            onGridReady: (event: GridReadyEvent) => {
                this.gridOptions.api       = event.api;
                this.gridOptions.columnApi = event.columnApi;
                this.loadReportsForDate(this.lotId, this.reportType, date);
            }
        };
    }

    public loadReportsForDate(lotId: number, reportType: ReportType, date: string): void {
        this.loading = true;
        const searchFilter: ReportFilterDto = {
            reportType: reportType,
            forDate:    date,
        };
        this.reportService.getReportForDate(lotId, searchFilter)
        .subscribe({
            next: (value: ReportResultDto) => {
                switch(reportType){
                    case ReportType.ParkingEventReport: {
                        this.reportsData = value.reportParkingEvent;
                        break;
                    }
                    case ReportType.ParkingTrafficReport: {

                        break;
                    }
                    case ReportType.ParkingPaymentReport: {

                        break;
                    }
                    case ReportType.UserActivityReport: {

                        break;
                    }
                }
                this.cdRef.markForCheck();
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

    ngOnDestroy() {
        
    }
}