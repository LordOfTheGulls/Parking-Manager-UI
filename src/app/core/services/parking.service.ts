import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, distinctUntilChanged, Observable, shareReplay } from "rxjs";
import { ParkingLotInfoDto } from "../models/parking/parking";
import { ParkingBlackListDto } from "../models/parking/parking-blacklist";
import { ParkingLocationDto } from "../models/parking/parking-location";
import { ParkingPricingDto, ParkingPricingIntervalsDto } from "../models/parking/parking-pricing";
import { ParkingWorkhourDto } from "../models/parking/parking-workhours";
import { AppConfigService } from "./app-config.service";


@Injectable({ providedIn: 'root' })
export class ParkingService {

    private parkingStatus$: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(
        private httpClient: HttpClient,
        private appConfigService: AppConfigService,
    ){

    }

    public parkingLotInfo(lotId: number): Observable<ParkingLotInfoDto>{
        return this.httpClient.get<ParkingLotInfoDto>(`${this.appConfigService.ApiBaseURL}/parking/${lotId}`);
    }

    public updateParkingLocation(lotId: number, location: ParkingLocationDto): Observable<any>{
        return this.httpClient.post(`${this.appConfigService.ApiBaseURL}/parking/location/update/${lotId}`, location);
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

    public getParkingWorkhours(lotId: number, parkingWorkhoursPlanId: number): Observable<ParkingWorkhourDto[]>{
        return this.httpClient.post<ParkingWorkhourDto[]>(`${this.appConfigService.ApiBaseURL}/parkingworkhours/all/${lotId}`, parkingWorkhoursPlanId);
    }

    public updateParkingWorkhours(lotId: number, parkingWorkhours: ParkingWorkhourDto): Observable<any>{
        return this.httpClient.post<any>(`${this.appConfigService.ApiBaseURL}/parkingworkhours/update/${lotId}`, parkingWorkhours);
    }

    public addToBlacklist(lotId: Number): Observable<any>{
        return this.httpClient.post(`${this.appConfigService.ApiBaseURL}/parkingblacklist/add/${lotId}`, null);
    }

    public updateParkingBlacklist(lotId: Number, parkingBlacklist: ParkingBlackListDto): Observable<ParkingBlackListDto[]>{
        return this.httpClient.post<ParkingBlackListDto[]>(`${this.appConfigService.ApiBaseURL}/parkingblacklist/update/${lotId}`, parkingBlacklist);
    }

    public deleteParkingBlacklist(lotId: number, parkingBlacklistId: number): Observable<any>{
        return this.httpClient.post(`${this.appConfigService.ApiBaseURL}/parkingblacklist/delete/${lotId}/${parkingBlacklistId}`, null);
    }

    public getParkingBlacklist(lotId: Number): Observable<ParkingBlackListDto[]>{
        return this.httpClient.post<ParkingBlackListDto[]>(`${this.appConfigService.ApiBaseURL}/parkingblacklist/all/${lotId}`, null);
    }
}