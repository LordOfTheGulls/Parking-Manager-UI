import { Injectable } from "@angular/core";
import { Observable, retry, RetryConfig, Subject, concatAll } from "rxjs";
import { webSocket, WebSocketSubject, WebSocketSubjectConfig } from 'rxjs/webSocket';
import { SocketPayload } from "../models/socket/socket_payload";
import { AppConfigService } from "./app-config.service";
import { ParkingService } from "./parking.service";

@Injectable({ providedIn: 'root' })
export class WebSocketService {

    private webSocket$: WebSocketSubject<any>;

    constructor(
        private appConfig: AppConfigService,
        private parkingService: ParkingService
    ){
        const webSocketConfig: WebSocketSubjectConfig<any> = {
            url: this.appConfig.WsBaseURL,
            serializer:   ({data}: any)   => data,
            deserializer: ({ data }: any) => data.text(),
        };
        this.webSocket$ = webSocket(webSocketConfig);
    }

    public connect() {
        this.webSocket$.pipe(
            retry({delay: 3000}), concatAll()
        ).subscribe((receivedData) => {
            let data = JSON.parse(receivedData + "") as SocketPayload
            if(data.emitType == 1){
                switch(data.payloadType){
                    case "status": {
                        this.parkingService.emitParkingStatus(data.payload);
                        break;
                    }
                    case "metadata": {
                        //this.parkingService.emitMetadata(data.payload);
                        break;
                    }
                    case "event": {
                        //this.parkingService.emitEvent(data.payload);
                        break;
                    }
                    default: return;
                }
            }
        });
    }
}