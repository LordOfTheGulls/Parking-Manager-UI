import { EventDTO } from "@app/core/models/event";
import { FilterDto } from "@app/core/models/filter/filter";
import { ReportType } from "../enums/report-type";

export interface ReportParkingEvent extends EventDTO{

}

export interface ReportCountResultDto {
    totalRecords: number;
    reportType: ReportType;
    date: string;
}

export interface ReportResultDto {
    reportParkingEvent?: ReportParkingEvent[];
}

export interface ReportCountFilterDto {
    reportType: ReportType;
    fromDate: string;
    toDate: string;
    filter: FilterDto;
}    

export interface ReportFilterDto {
    reportType: ReportType;
    forDate: string;
}    

