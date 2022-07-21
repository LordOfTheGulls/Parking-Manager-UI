import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { WeeklyChartDto } from "src/app/modules/dashboard/core/models/chart";
import { ParkingPaymentDto } from "../../modules/payment/core/models/payment";
import { FilterDto } from "../models/filter/filter";
import { PagingResult } from "../models/paging/paging";
import { ParkingLotPaymentDto } from "../models/parking/parking-payment";
import { AppConfigService } from "./app-config.service";

@Injectable({ providedIn: 'root' })
export class PaymentService {

    constructor(
        private appConfigService: AppConfigService,
        private httpClient: HttpClient,
    ){

    }

    public payForStay(lotId: number, payInfo: ParkingPaymentDto): Observable<any> {
        return this.httpClient.post(`${this.appConfigService.ApiBaseURL}/parkingpayment/payforstay/${lotId}`, payInfo);
    }

    public getAllPayments(lotId: number, filter: FilterDto): Observable<PagingResult<ParkingLotPaymentDto>>{
        return this.httpClient.post<PagingResult<ParkingLotPaymentDto>>(`${this.appConfigService.ApiBaseURL}/parkingpayment/all/${lotId}`, filter);
    }
}