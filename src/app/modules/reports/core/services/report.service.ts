import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EventDTO } from "@app/core/models/event";
import { PagingResult } from "@app/core/models/paging/paging";
import { AppConfigService } from "@app/core/services/app-config.service";
import { Observable } from "rxjs";
import { ReportCountFilterDto, ReportCountResultDto, ReportFilterDto, ReportResultDto } from "../models/report";

@Injectable({ providedIn: 'root' })
export class ReportService{

    constructor(
        private appConfigService: AppConfigService,
        private httpClient: HttpClient,
    ){

    }

    public getReportCountData(lotId: number, filter: ReportCountFilterDto): Observable<PagingResult<ReportCountResultDto>> {
        return this.httpClient.post<PagingResult<ReportCountResultDto>>(`${this.appConfigService.ApiBaseURL}/report/counts/${lotId}`, filter);
    }
    
    public getReportForDate(lotId: number, filter: ReportFilterDto): Observable<ReportResultDto> {
        return this.httpClient.post<ReportResultDto>(`${this.appConfigService.ApiBaseURL}/report/bydate/${lotId}`, filter);
    }
}