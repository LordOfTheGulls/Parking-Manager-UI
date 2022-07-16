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

    public getParkingTrafficData(lotId: number, filter: FilterDto): Observable<PagingResult<TrafficDTO>> {
        return this.httpClient.post<PagingResult<TrafficDTO>>(`${this.appConfigService.ApiBaseURL}/trafficdata/${lotId}`, filter);
    }
}