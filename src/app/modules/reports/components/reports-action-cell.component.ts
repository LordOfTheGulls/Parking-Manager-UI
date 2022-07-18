import { OnInit, Component, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef} from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid-community";
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";
import { ExportReportByDateRequest, ExportReportByDateResponse } from "proto/gen/export.pb";
import { ExportClient } from "proto/gen/export.pbsc";
import { ReportType } from "../core/enums/report-type";
import { ReportCountResultDto } from "../core/models/report";
import * as Excel from 'exceljs';
import * as moment from "moment";

@AutoUnsubscribe()
@Component({
    template: `
        <button mat-raised-button color="accent" id="export-btn" type="button" (click)="exportByDateReport()" [disabled]="isExportDisabled" [disabled]="exporting">
            <mat-icon matSuffix class="export-icon">save_alt</mat-icon>
            <app-spinner [showSpinner]="exporting" [options]="spinnerOptions"></app-spinner>
        </button>
    `,
    styles: [`
        button{
            width: 100%;
            height: 100%;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportsActionCellComponent implements ICellRendererAngularComp, OnInit, OnDestroy{
    public gridOptions: any;

    private params: any;

    private lotId: number = 0;
    private date:  string = '';
    private reportType: ReportType = ReportType.None;

    public isExportDisabled: boolean = false;

    public exporting: boolean = false;

    public spinnerOptions = {
        size: 'small',
        type: 'ball-spin',
        color: 'green'
    };

    constructor(
        private exportService: ExportClient,
        private cdRef: ChangeDetectorRef
    ){

    }
    
    refresh(params: ICellRendererParams): boolean {
        this.initializeButton(params);
        return false;
    }

    agInit(params: ICellRendererParams): void {
        this.initializeButton(params);
    }

    ngOnInit() {

    }
  
    private initializeButton(params: any): void {
        const { totalRecords, reportType, date } = params.data as ReportCountResultDto;
        const { lotId } = params.context;
        this.params           = params;
        this.lotId            = lotId;
        this.date             = date;
        this.reportType       = reportType;
        this.isExportDisabled = !(totalRecords > 0);
    }

    public exportByDateReport(): void {
        if(!this.isExportDisabled && !this.exporting){
            this.exporting = true;

            const workbook = new Excel.Workbook();

            const worksheet = workbook.addWorksheet();
            
            switch(this.reportType){
                case ReportType.ParkingEventReport: {
                    worksheet.name = `Events Report ${moment(this.date).format('DDMMyyyy')}`;
                    worksheet.columns = [
                        { header: 'Event Log Id', key: 'eventLogId', width: 40, numFmt: '@' },
                        { header: 'Event Date',   key: 'eventDate',  width: 40, numFmt: '@' },
                        { header: 'Event Name',   key: 'eventName',  width: 40 },
                        { header: 'Event Id',     key: 'eventId',    width: 40 },
                    ]
                    break;
                }
            }

            this.exportService.exportReportByDate(new ExportReportByDateRequest({ 
                parkingLotId:   this.lotId.toString(),
                reportType:     this.reportType,
                reportForDate:  this.date
            })).subscribe({
                next: (chunk: ExportReportByDateResponse) => {
                    let rows: any = [];
                    console.log('NEW CHUNK: ', chunk)

                    if(this.reportType === ReportType.ParkingEventReport){
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

    ngOnDestroy() {
        
    }
}