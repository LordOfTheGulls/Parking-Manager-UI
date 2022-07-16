import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PagingResult } from "@app/core/models/paging/paging";
import { AppConfigService } from "@app/core/services/app-config.service";
import { Observable } from "rxjs";
import { ReportCountResultDto, ReportFilterDto } from "../models/report";

@Injectable({ providedIn: 'root' })
export class ReportService{

    constructor(
        private appConfigService: AppConfigService,
        private httpClient: HttpClient,
    ){

    }

    public getReportCountData(lotId: number, filter: ReportFilterDto): Observable<PagingResult<ReportCountResultDto>> {
        return this.httpClient.post<PagingResult<ReportCountResultDto>>(`${this.appConfigService.ApiBaseURL}/report/count/${lotId}`, filter);
    }
}