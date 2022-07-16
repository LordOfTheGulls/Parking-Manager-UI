import { Injectable } from "@angular/core";
import { GrpcMetadata } from "@ngx-grpc/common";
import { ExportReportRequest } from "proto/gen/export.pb";
import { Observable } from "rxjs";
import { ExportClient } from "../../../../proto/gen/export.pbsc";

@Injectable({ providedIn: 'root' })
export class ExportService{

    constructor(private exportClient: ExportClient){

    }

    public exportReport(data: ExportReportRequest): Observable<any> {
        return this.exportClient.exportReport(data, new GrpcMetadata({}));
    }
}