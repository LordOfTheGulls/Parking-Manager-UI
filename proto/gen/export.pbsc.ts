/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
//
// THIS IS A GENERATED FILE
// DO NOT MODIFY IT! YOUR CHANGES WILL BE LOST
import { Inject, Injectable, Optional } from '@angular/core';
import {
  GrpcCallType,
  GrpcClient,
  GrpcClientFactory,
  GrpcEvent,
  GrpcMetadata
} from '@ngx-grpc/common';
import {
  GRPC_CLIENT_FACTORY,
  GrpcHandler,
  takeMessages,
  throwStatusErrors
} from '@ngx-grpc/core';
import { Observable } from 'rxjs';
import * as thisProto from './export.pb';
import { GRPC_EXPORT_CLIENT_SETTINGS } from './export.pbconf';
/**
 * Service client implementation for export.Export
 */
@Injectable({ providedIn: 'any' })
export class ExportClient {
  private client: GrpcClient<any>;

  /**
   * Raw RPC implementation for each service client method.
   * The raw methods provide more control on the incoming data and events. E.g. they can be useful to read status `OK` metadata.
   * Attention: these methods do not throw errors when non-zero status codes are received.
   */
  $raw = {
    /**
     * Server streaming: /export.Export/ExportReportByDate
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.ExportReportByDateResponse>>
     */
    exportReportByDate: (
      requestData: thisProto.ExportReportByDateRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.ExportReportByDateResponse>> => {
      return this.handler.handle({
        type: GrpcCallType.serverStream,
        client: this.client,
        path: '/export.Export/ExportReportByDate',
        requestData,
        requestMetadata,
        requestClass: thisProto.ExportReportByDateRequest,
        responseClass: thisProto.ExportReportByDateResponse
      });
    },
    /**
     * Server streaming: /export.Export/ExportReportByPeriod
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.ExportReportByPeriodResponse>>
     */
    exportReportByPeriod: (
      requestData: thisProto.ExportReportByPeriodRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.ExportReportByPeriodResponse>> => {
      return this.handler.handle({
        type: GrpcCallType.serverStream,
        client: this.client,
        path: '/export.Export/ExportReportByPeriod',
        requestData,
        requestMetadata,
        requestClass: thisProto.ExportReportByPeriodRequest,
        responseClass: thisProto.ExportReportByPeriodResponse
      });
    }
  };

  constructor(
    @Optional() @Inject(GRPC_EXPORT_CLIENT_SETTINGS) settings: any,
    @Inject(GRPC_CLIENT_FACTORY) clientFactory: GrpcClientFactory<any>,
    private handler: GrpcHandler
  ) {
    this.client = clientFactory.createClient('export.Export', settings);
  }

  /**
   * Server streaming @/export.Export/ExportReportByDate
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.ExportReportByDateResponse>
   */
  exportReportByDate(
    requestData: thisProto.ExportReportByDateRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.ExportReportByDateResponse> {
    return this.$raw
      .exportReportByDate(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Server streaming @/export.Export/ExportReportByPeriod
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.ExportReportByPeriodResponse>
   */
  exportReportByPeriod(
    requestData: thisProto.ExportReportByPeriodRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.ExportReportByPeriodResponse> {
    return this.$raw
      .exportReportByPeriod(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }
}
