import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, distinctUntilChanged, Observable, shareReplay } from "rxjs";
import { ParkingPricingDto, ParkingPricingIntervalsDto } from "../models/parking/parking-pricing";
import { AppConfigService } from "./app-config.service";


@Injectable({ providedIn: 'root' })
export class ParkingService {

    private parkingStatus$: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(
        private httpClient: HttpClient,
        private appConfigService: AppConfigService,
    ){

    }

    public get parkingStatus() {
        return this.parkingStatus$.pipe(shareReplay(), distinctUntilChanged());
    }

    public emitParkingStatus(data: any): void {
        this.parkingStatus$.next(data);
    }

    public addParkingPricingInterval(lotId: number, parkingPricingPlanId: number = 1, dayOfWeek: number): Observable<any>{
        return this.httpClient.post(`${this.appConfigService.ApiBaseURL}/parkingpricing/interval/add/${lotId}`, { parkingPricingPlanId, dayOfWeek });
    }

    public updateParkingPricingInterval(intervalId: number, pricingData: ParkingPricingDto): Observable<any>{
        return this.httpClient.post(`${this.appConfigService.ApiBaseURL}/parkingpricing/interval/update/${intervalId}`, pricingData);
    }

    public deleteParkingPricingInterval(intervalId: number): Observable<any>{
        return this.httpClient.post(`${this.appConfigService.ApiBaseURL}/parkingpricing/interval/delete/${intervalId}`, null);
    }

    public getParkingPricingIntervals(lotId: number, parkingPricingPlanId: number): Observable<ParkingPricingIntervalsDto>{
        return this.httpClient.get<ParkingPricingIntervalsDto>(`${this.appConfigService.ApiBaseURL}/parkingpricing/intervals/${lotId}/${parkingPricingPlanId}`);
    }
}