import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "oidc-client";
import { BehaviorSubject, distinctUntilChanged, Observable, shareReplay } from "rxjs";
import { FilterDto } from "../models/filter/filter";
import { PagingResult } from "../models/paging/paging";
import { ParkingBlackListDto } from "../models/parking/parking-blacklist";
import { ParkingPricingDto, ParkingPricingIntervalsDto } from "../models/parking/parking-pricing";
import { ParkingWorkhourDto } from "../models/parking/parking-workhours";
import { UserDto, UserRightDto } from "../models/user/user";
import { AppConfigService } from "./app-config.service";


@Injectable({ providedIn: 'root' })
export class UserService {

    public loggedUser: BehaviorSubject<UserDto> = new BehaviorSubject({} as UserDto);

    constructor(
        private httpClient: HttpClient,
        private appConfigService: AppConfigService,
    ){

    }

    public addUser(): Observable<any>{
        return this.httpClient.post(`${this.appConfigService.ApiBaseURL}/user/add`, null);
    }

    public updateUser(userId: number, user: UserDto): Observable<any>{
        return this.httpClient.post(`${this.appConfigService.ApiBaseURL}/user/update/${userId}`, user);
    }

    public deleteUser(userId: number): Observable<any>{
        return this.httpClient.post(`${this.appConfigService.ApiBaseURL}/user/delete/${userId}`, null);
    }

    public updatePermissions(userId: number, userRight: UserRightDto): Observable<UserRightDto>{
        return this.httpClient.post<UserRightDto>(`${this.appConfigService.ApiBaseURL}/user/permission/update/${userId}`, userRight);
    }

    public getPermissions(userId: number): Observable<UserRightDto>{
        return this.httpClient.post<UserRightDto>(`${this.appConfigService.ApiBaseURL}/user/permissions/${userId}`, null);
    }

    public getUser(userId: number){
        return this.httpClient.post<UserDto>(`${this.appConfigService.ApiBaseURL}/user/${userId}`, null);
    }

    public getUsers(filter: FilterDto): Observable<PagingResult<UserDto>>{
        return this.httpClient.post<PagingResult<UserDto>>(`${this.appConfigService.ApiBaseURL}/user/all`, filter);
    }
}