import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { WeeklyChartDto } from "src/app/modules/dashboard/core/models/chart";
import { ParkingPaymentDto } from "../../modules/payment/core/models/payment";
import { AppConfigService } from "./app-config.service";

@Injectable({ providedIn: 'root' })
export class PaymentService {

    constructor(
        private appConfigService: AppConfigService,
        private httpClient: HttpClient,
    ){

    }

    public payForStay(lotId: number, payInfo: ParkingPaymentDto): Observable<any> {
        return this.httpClient.post(`${this.appConfigService.ApiBaseURL}/payment/payforstay/${lotId}`, payInfo);
    }
}