import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EventDTO } from "../../../core/models/event";
import { FilterDto } from "../../../core/models/filter/filter";
import { Paging, PagingResult } from "../../../core/models/paging/paging";
import { Sorting } from "../../../core/models/sorting/sorting";
import { TrafficDTO } from "../../../core/models/traffic";
import { AppConfigService } from "../../../core/services/app-config.service";
import { ParkingService } from "../../../core/services/parking.service";
import { WeeklyChartDto, ParkingTrafficInForWeekFilterDto } from "../core/models/chart";


@Injectable({ providedIn: 'root' })
export class DashboardService {

    constructor(
        private appConfigService: AppConfigService,
        private httpClient: HttpClient,
        private parkingService: ParkingService
    ){}

    public getParkingLotEvents(lotId: number, filter: FilterDto): Observable<PagingResult<EventDTO>> {
        return this.httpClient.post<PagingResult<EventDTO>>(`${this.appConfigService.ApiBaseURL}/parkingevent/all/${lotId}`, filter);
    }

    public getParkingEventsForWeekData(lotId: number, date: string): Observable<WeeklyChartDto<number>> {
        return this.httpClient.post<WeeklyChartDto<number>>(`${this.appConfigService.ApiBaseURL}/parkingevent/week/${lotId}`, { fromDate: date });
    }

    public getParkingTrafficData(lotId: number, filter: FilterDto): Observable<PagingResult<TrafficDTO>> {
        return this.httpClient.post<PagingResult<TrafficDTO>>(`${this.appConfigService.ApiBaseURL}/parkingtraffic/all/${lotId}`, filter);
    }

    public getAverageStayTimeForPeriod(lotId: number, fromDate: string, toDate: string): Observable<number> {
        return this.httpClient.post<number>(`${this.appConfigService.ApiBaseURL}/parkingtraffic/stay/average/period/${lotId}`, { fromDate, toDate });
    }

    public getParkingTrafficInForPeriod(lotId: number, fromDate: string, toDate: string): Observable<number> {
        return this.httpClient.post<number>(`${this.appConfigService.ApiBaseURL}/parkingtraffic/in/period/${lotId}`, { fromDate, toDate });
    }

    public getParkingTrafficInForWeekData(lotId: number, filter: ParkingTrafficInForWeekFilterDto): Observable<WeeklyChartDto<number>> {
        return this.httpClient.post<WeeklyChartDto<number>>(`${this.appConfigService.ApiBaseURL}/parkingtraffic/in/week/${lotId}`, filter);
    }
    
    public getTotalProfitForPeriod(lotId: number, fromDate: string, toDate: string): Observable<number> {
        return this.httpClient.post<number>(`${this.appConfigService.ApiBaseURL}/parkingpayment/profit/period/${lotId}`, { fromDate, toDate });
    }

    public getTotalProfitForWeek(lotId: number, date: string): Observable<WeeklyChartDto<number>> {
        return this.httpClient.post<WeeklyChartDto<number>>(`${this.appConfigService.ApiBaseURL}/parkingpayment/profit/week/${lotId}`, { fromDate: date });
    }

    public getUserActivityForWeekData(lotId: number, date: string): Observable<WeeklyChartDto<number>> {
        return this.httpClient.post<WeeklyChartDto<number>>(`${this.appConfigService.ApiBaseURL}/user/activity/week/${lotId}`, { fromDate: date });
    }
}