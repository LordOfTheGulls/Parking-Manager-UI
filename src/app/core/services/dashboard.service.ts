import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EventDTO } from "../models/event";
import { FilterDto } from "../models/filter/filter";
import { Paging, PagingResult } from "../models/paging/paging";
import { Sorting } from "../models/sorting/sorting";
import { AppConfigService } from "./app-config.service";
import { ParkingService } from "./parking.service";


@Injectable({ providedIn: 'root' })
export class DashboardService {

    constructor(
        private appConfigService: AppConfigService,
        private httpClient: HttpClient,
        private parkingService: ParkingService
    ){

    }

    public getParkingLotEvents(lotId: number, filter: FilterDto): Observable<PagingResult<EventDTO>> {
        return this.httpClient.post<PagingResult<EventDTO>>(`${this.appConfigService.ApiBaseURL}/parkingevent/all/${lotId}`, filter);
    }
}