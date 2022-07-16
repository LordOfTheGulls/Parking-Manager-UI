import { FilterDto } from "@app/core/models/filter/filter";
import { ReportType } from "../enums/report-type";

export interface ReportCountResultDto {
    totalRecords: number;
    reportType: ReportType;
    date: string;
}

export interface ReportFilterDto {
    reportType: ReportType;
    fromDate: string;
    toDate: string;
    filter: FilterDto;
}    