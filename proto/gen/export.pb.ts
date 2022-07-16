/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
//
// THIS IS A GENERATED FILE
// DO NOT MODIFY IT! YOUR CHANGES WILL BE LOST
import {
  GrpcMessage,
  RecursivePartial,
  ToProtobufJSONOptions
} from '@ngx-grpc/common';
import { BinaryReader, BinaryWriter, ByteSource } from 'google-protobuf';

/**
 * Message implementation for export.ExportReportRequest
 */
export class ExportReportRequest implements GrpcMessage {
  static id = 'export.ExportReportRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new ExportReportRequest();
    ExportReportRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: ExportReportRequest) {
    _instance.reportFromDate = _instance.reportFromDate || '';
    _instance.reportToDate = _instance.reportToDate || '';
    _instance.reportType = _instance.reportType || 0;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: ExportReportRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.reportFromDate = _reader.readString();
          break;
        case 2:
          _instance.reportToDate = _reader.readString();
          break;
        case 3:
          _instance.reportType = _reader.readInt32();
          break;
        default:
          _reader.skipField();
      }
    }

    ExportReportRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: ExportReportRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.reportFromDate) {
      _writer.writeString(1, _instance.reportFromDate);
    }
    if (_instance.reportToDate) {
      _writer.writeString(2, _instance.reportToDate);
    }
    if (_instance.reportType) {
      _writer.writeInt32(3, _instance.reportType);
    }
  }

  private _reportFromDate?: string;
  private _reportToDate?: string;
  private _reportType?: number;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of ExportReportRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<ExportReportRequest.AsObject>) {
    _value = _value || {};
    this.reportFromDate = _value.reportFromDate;
    this.reportToDate = _value.reportToDate;
    this.reportType = _value.reportType;
    ExportReportRequest.refineValues(this);
  }
  get reportFromDate(): string | undefined {
    return this._reportFromDate;
  }
  set reportFromDate(value: string | undefined) {
    this._reportFromDate = value;
  }
  get reportToDate(): string | undefined {
    return this._reportToDate;
  }
  set reportToDate(value: string | undefined) {
    this._reportToDate = value;
  }
  get reportType(): number | undefined {
    return this._reportType;
  }
  set reportType(value: number | undefined) {
    this._reportType = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    ExportReportRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): ExportReportRequest.AsObject {
    return {
      reportFromDate: this.reportFromDate,
      reportToDate: this.reportToDate,
      reportType: this.reportType
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): ExportReportRequest.AsProtobufJSON {
    return {
      reportFromDate: this.reportFromDate,
      reportToDate: this.reportToDate,
      reportType: this.reportType
    };
  }
}
export module ExportReportRequest {
  /**
   * Standard JavaScript object representation for ExportReportRequest
   */
  export interface AsObject {
    reportFromDate?: string;
    reportToDate?: string;
    reportType?: number;
  }

  /**
   * Protobuf JSON representation for ExportReportRequest
   */
  export interface AsProtobufJSON {
    reportFromDate?: string;
    reportToDate?: string;
    reportType?: number;
  }
}

/**
 * Message implementation for export.ExportReportResponse
 */
export class ExportReportResponse implements GrpcMessage {
  static id = 'export.ExportReportResponse';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new ExportReportResponse();
    ExportReportResponse.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: ExportReportResponse) {
    _instance.parkingEventLog = _instance.parkingEventLog || [];
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: ExportReportResponse,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          const messageInitializer1 = new ExportParkingEventLog();
          _reader.readMessage(
            messageInitializer1,
            ExportParkingEventLog.deserializeBinaryFromReader
          );
          (_instance.parkingEventLog = _instance.parkingEventLog || []).push(
            messageInitializer1
          );
          break;
        default:
          _reader.skipField();
      }
    }

    ExportReportResponse.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: ExportReportResponse,
    _writer: BinaryWriter
  ) {
    if (_instance.parkingEventLog && _instance.parkingEventLog.length) {
      _writer.writeRepeatedMessage(
        1,
        _instance.parkingEventLog as any,
        ExportParkingEventLog.serializeBinaryToWriter
      );
    }
  }

  private _parkingEventLog?: ExportParkingEventLog[];

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of ExportReportResponse to deeply clone from
   */
  constructor(_value?: RecursivePartial<ExportReportResponse.AsObject>) {
    _value = _value || {};
    this.parkingEventLog = (_value.parkingEventLog || []).map(
      m => new ExportParkingEventLog(m)
    );
    ExportReportResponse.refineValues(this);
  }
  get parkingEventLog(): ExportParkingEventLog[] | undefined {
    return this._parkingEventLog;
  }
  set parkingEventLog(value: ExportParkingEventLog[] | undefined) {
    this._parkingEventLog = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    ExportReportResponse.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): ExportReportResponse.AsObject {
    return {
      parkingEventLog: (this.parkingEventLog || []).map(m => m.toObject())
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): ExportReportResponse.AsProtobufJSON {
    return {
      parkingEventLog: (this.parkingEventLog || []).map(m =>
        m.toProtobufJSON(options)
      )
    };
  }
}
export module ExportReportResponse {
  /**
   * Standard JavaScript object representation for ExportReportResponse
   */
  export interface AsObject {
    parkingEventLog?: ExportParkingEventLog.AsObject[];
  }

  /**
   * Protobuf JSON representation for ExportReportResponse
   */
  export interface AsProtobufJSON {
    parkingEventLog?: ExportParkingEventLog.AsProtobufJSON[] | null;
  }
}

/**
 * Message implementation for export.ExportParkingEventLog
 */
export class ExportParkingEventLog implements GrpcMessage {
  static id = 'export.ExportParkingEventLog';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new ExportParkingEventLog();
    ExportParkingEventLog.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: ExportParkingEventLog) {
    _instance.eventId = _instance.eventId || 0;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: ExportParkingEventLog,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.eventId = _reader.readInt32();
          break;
        default:
          _reader.skipField();
      }
    }

    ExportParkingEventLog.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: ExportParkingEventLog,
    _writer: BinaryWriter
  ) {
    if (_instance.eventId) {
      _writer.writeInt32(1, _instance.eventId);
    }
  }

  private _eventId?: number;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of ExportParkingEventLog to deeply clone from
   */
  constructor(_value?: RecursivePartial<ExportParkingEventLog.AsObject>) {
    _value = _value || {};
    this.eventId = _value.eventId;
    ExportParkingEventLog.refineValues(this);
  }
  get eventId(): number | undefined {
    return this._eventId;
  }
  set eventId(value: number | undefined) {
    this._eventId = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    ExportParkingEventLog.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): ExportParkingEventLog.AsObject {
    return {
      eventId: this.eventId
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): ExportParkingEventLog.AsProtobufJSON {
    return {
      eventId: this.eventId
    };
  }
}
export module ExportParkingEventLog {
  /**
   * Standard JavaScript object representation for ExportParkingEventLog
   */
  export interface AsObject {
    eventId?: number;
  }

  /**
   * Protobuf JSON representation for ExportParkingEventLog
   */
  export interface AsProtobufJSON {
    eventId?: number;
  }
}
