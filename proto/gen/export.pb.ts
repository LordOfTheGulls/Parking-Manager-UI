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
 * Message implementation for export.ExportReportByDateRequest
 */
export class ExportReportByDateRequest implements GrpcMessage {
  static id = 'export.ExportReportByDateRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new ExportReportByDateRequest();
    ExportReportByDateRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: ExportReportByDateRequest) {
    _instance.parkingLotId = _instance.parkingLotId || '0';
    _instance.reportType = _instance.reportType || 0;
    _instance.reportForDate = _instance.reportForDate || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: ExportReportByDateRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.parkingLotId = _reader.readInt64String();
          break;
        case 2:
          _instance.reportType = _reader.readInt32();
          break;
        case 3:
          _instance.reportForDate = _reader.readString();
          break;
        default:
          _reader.skipField();
      }
    }

    ExportReportByDateRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: ExportReportByDateRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.parkingLotId) {
      _writer.writeInt64String(1, _instance.parkingLotId);
    }
    if (_instance.reportType) {
      _writer.writeInt32(2, _instance.reportType);
    }
    if (_instance.reportForDate) {
      _writer.writeString(3, _instance.reportForDate);
    }
  }

  private _parkingLotId?: string;
  private _reportType?: number;
  private _reportForDate?: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of ExportReportByDateRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<ExportReportByDateRequest.AsObject>) {
    _value = _value || {};
    this.parkingLotId = _value.parkingLotId;
    this.reportType = _value.reportType;
    this.reportForDate = _value.reportForDate;
    ExportReportByDateRequest.refineValues(this);
  }
  get parkingLotId(): string | undefined {
    return this._parkingLotId;
  }
  set parkingLotId(value: string | undefined) {
    this._parkingLotId = value;
  }
  get reportType(): number | undefined {
    return this._reportType;
  }
  set reportType(value: number | undefined) {
    this._reportType = value;
  }
  get reportForDate(): string | undefined {
    return this._reportForDate;
  }
  set reportForDate(value: string | undefined) {
    this._reportForDate = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    ExportReportByDateRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): ExportReportByDateRequest.AsObject {
    return {
      parkingLotId: this.parkingLotId,
      reportType: this.reportType,
      reportForDate: this.reportForDate
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
  ): ExportReportByDateRequest.AsProtobufJSON {
    return {
      parkingLotId: this.parkingLotId,
      reportType: this.reportType,
      reportForDate: this.reportForDate
    };
  }
}
export module ExportReportByDateRequest {
  /**
   * Standard JavaScript object representation for ExportReportByDateRequest
   */
  export interface AsObject {
    parkingLotId?: string;
    reportType?: number;
    reportForDate?: string;
  }

  /**
   * Protobuf JSON representation for ExportReportByDateRequest
   */
  export interface AsProtobufJSON {
    parkingLotId?: string;
    reportType?: number;
    reportForDate?: string;
  }
}

/**
 * Message implementation for export.ExportReportByDateResponse
 */
export class ExportReportByDateResponse implements GrpcMessage {
  static id = 'export.ExportReportByDateResponse';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new ExportReportByDateResponse();
    ExportReportByDateResponse.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: ExportReportByDateResponse) {
    _instance.parkingEventReport = _instance.parkingEventReport || [];
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: ExportReportByDateResponse,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          const messageInitializer1 = new ExportParkingEventReport();
          _reader.readMessage(
            messageInitializer1,
            ExportParkingEventReport.deserializeBinaryFromReader
          );
          (_instance.parkingEventReport =
            _instance.parkingEventReport || []).push(messageInitializer1);
          break;
        default:
          _reader.skipField();
      }
    }

    ExportReportByDateResponse.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: ExportReportByDateResponse,
    _writer: BinaryWriter
  ) {
    if (_instance.parkingEventReport && _instance.parkingEventReport.length) {
      _writer.writeRepeatedMessage(
        1,
        _instance.parkingEventReport as any,
        ExportParkingEventReport.serializeBinaryToWriter
      );
    }
  }

  private _parkingEventReport?: ExportParkingEventReport[];

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of ExportReportByDateResponse to deeply clone from
   */
  constructor(_value?: RecursivePartial<ExportReportByDateResponse.AsObject>) {
    _value = _value || {};
    this.parkingEventReport = (_value.parkingEventReport || []).map(
      m => new ExportParkingEventReport(m)
    );
    ExportReportByDateResponse.refineValues(this);
  }
  get parkingEventReport(): ExportParkingEventReport[] | undefined {
    return this._parkingEventReport;
  }
  set parkingEventReport(value: ExportParkingEventReport[] | undefined) {
    this._parkingEventReport = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    ExportReportByDateResponse.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): ExportReportByDateResponse.AsObject {
    return {
      parkingEventReport: (this.parkingEventReport || []).map(m => m.toObject())
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
  ): ExportReportByDateResponse.AsProtobufJSON {
    return {
      parkingEventReport: (this.parkingEventReport || []).map(m =>
        m.toProtobufJSON(options)
      )
    };
  }
}
export module ExportReportByDateResponse {
  /**
   * Standard JavaScript object representation for ExportReportByDateResponse
   */
  export interface AsObject {
    parkingEventReport?: ExportParkingEventReport.AsObject[];
  }

  /**
   * Protobuf JSON representation for ExportReportByDateResponse
   */
  export interface AsProtobufJSON {
    parkingEventReport?: ExportParkingEventReport.AsProtobufJSON[] | null;
  }
}

/**
 * Message implementation for export.ExportReportByPeriodRequest
 */
export class ExportReportByPeriodRequest implements GrpcMessage {
  static id = 'export.ExportReportByPeriodRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new ExportReportByPeriodRequest();
    ExportReportByPeriodRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: ExportReportByPeriodRequest) {
    _instance.parkingLotId = _instance.parkingLotId || '0';
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
    _instance: ExportReportByPeriodRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.parkingLotId = _reader.readInt64String();
          break;
        case 2:
          _instance.reportFromDate = _reader.readString();
          break;
        case 3:
          _instance.reportToDate = _reader.readString();
          break;
        case 4:
          _instance.reportType = _reader.readInt32();
          break;
        default:
          _reader.skipField();
      }
    }

    ExportReportByPeriodRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: ExportReportByPeriodRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.parkingLotId) {
      _writer.writeInt64String(1, _instance.parkingLotId);
    }
    if (_instance.reportFromDate) {
      _writer.writeString(2, _instance.reportFromDate);
    }
    if (_instance.reportToDate) {
      _writer.writeString(3, _instance.reportToDate);
    }
    if (_instance.reportType) {
      _writer.writeInt32(4, _instance.reportType);
    }
  }

  private _parkingLotId?: string;
  private _reportFromDate?: string;
  private _reportToDate?: string;
  private _reportType?: number;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of ExportReportByPeriodRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<ExportReportByPeriodRequest.AsObject>) {
    _value = _value || {};
    this.parkingLotId = _value.parkingLotId;
    this.reportFromDate = _value.reportFromDate;
    this.reportToDate = _value.reportToDate;
    this.reportType = _value.reportType;
    ExportReportByPeriodRequest.refineValues(this);
  }
  get parkingLotId(): string | undefined {
    return this._parkingLotId;
  }
  set parkingLotId(value: string | undefined) {
    this._parkingLotId = value;
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
    ExportReportByPeriodRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): ExportReportByPeriodRequest.AsObject {
    return {
      parkingLotId: this.parkingLotId,
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
  ): ExportReportByPeriodRequest.AsProtobufJSON {
    return {
      parkingLotId: this.parkingLotId,
      reportFromDate: this.reportFromDate,
      reportToDate: this.reportToDate,
      reportType: this.reportType
    };
  }
}
export module ExportReportByPeriodRequest {
  /**
   * Standard JavaScript object representation for ExportReportByPeriodRequest
   */
  export interface AsObject {
    parkingLotId?: string;
    reportFromDate?: string;
    reportToDate?: string;
    reportType?: number;
  }

  /**
   * Protobuf JSON representation for ExportReportByPeriodRequest
   */
  export interface AsProtobufJSON {
    parkingLotId?: string;
    reportFromDate?: string;
    reportToDate?: string;
    reportType?: number;
  }
}

/**
 * Message implementation for export.ExportReportByPeriodResponse
 */
export class ExportReportByPeriodResponse implements GrpcMessage {
  static id = 'export.ExportReportByPeriodResponse';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new ExportReportByPeriodResponse();
    ExportReportByPeriodResponse.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: ExportReportByPeriodResponse) {
    _instance.parkingEventReport = _instance.parkingEventReport || [];
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: ExportReportByPeriodResponse,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          const messageInitializer1 = new ExportParkingEventReport();
          _reader.readMessage(
            messageInitializer1,
            ExportParkingEventReport.deserializeBinaryFromReader
          );
          (_instance.parkingEventReport =
            _instance.parkingEventReport || []).push(messageInitializer1);
          break;
        default:
          _reader.skipField();
      }
    }

    ExportReportByPeriodResponse.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: ExportReportByPeriodResponse,
    _writer: BinaryWriter
  ) {
    if (_instance.parkingEventReport && _instance.parkingEventReport.length) {
      _writer.writeRepeatedMessage(
        1,
        _instance.parkingEventReport as any,
        ExportParkingEventReport.serializeBinaryToWriter
      );
    }
  }

  private _parkingEventReport?: ExportParkingEventReport[];

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of ExportReportByPeriodResponse to deeply clone from
   */
  constructor(
    _value?: RecursivePartial<ExportReportByPeriodResponse.AsObject>
  ) {
    _value = _value || {};
    this.parkingEventReport = (_value.parkingEventReport || []).map(
      m => new ExportParkingEventReport(m)
    );
    ExportReportByPeriodResponse.refineValues(this);
  }
  get parkingEventReport(): ExportParkingEventReport[] | undefined {
    return this._parkingEventReport;
  }
  set parkingEventReport(value: ExportParkingEventReport[] | undefined) {
    this._parkingEventReport = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    ExportReportByPeriodResponse.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): ExportReportByPeriodResponse.AsObject {
    return {
      parkingEventReport: (this.parkingEventReport || []).map(m => m.toObject())
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
  ): ExportReportByPeriodResponse.AsProtobufJSON {
    return {
      parkingEventReport: (this.parkingEventReport || []).map(m =>
        m.toProtobufJSON(options)
      )
    };
  }
}
export module ExportReportByPeriodResponse {
  /**
   * Standard JavaScript object representation for ExportReportByPeriodResponse
   */
  export interface AsObject {
    parkingEventReport?: ExportParkingEventReport.AsObject[];
  }

  /**
   * Protobuf JSON representation for ExportReportByPeriodResponse
   */
  export interface AsProtobufJSON {
    parkingEventReport?: ExportParkingEventReport.AsProtobufJSON[] | null;
  }
}

/**
 * Message implementation for export.ExportParkingEventReport
 */
export class ExportParkingEventReport implements GrpcMessage {
  static id = 'export.ExportParkingEventReport';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new ExportParkingEventReport();
    ExportParkingEventReport.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: ExportParkingEventReport) {
    _instance.eventLogId = _instance.eventLogId || '0';
    _instance.eventId = _instance.eventId || '0';
    _instance.eventName = _instance.eventName || '';
    _instance.eventDate = _instance.eventDate || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: ExportParkingEventReport,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.eventLogId = _reader.readInt64String();
          break;
        case 2:
          _instance.eventId = _reader.readInt64String();
          break;
        case 3:
          _instance.eventName = _reader.readString();
          break;
        case 4:
          _instance.eventDate = _reader.readString();
          break;
        default:
          _reader.skipField();
      }
    }

    ExportParkingEventReport.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: ExportParkingEventReport,
    _writer: BinaryWriter
  ) {
    if (_instance.eventLogId) {
      _writer.writeInt64String(1, _instance.eventLogId);
    }
    if (_instance.eventId) {
      _writer.writeInt64String(2, _instance.eventId);
    }
    if (_instance.eventName) {
      _writer.writeString(3, _instance.eventName);
    }
    if (_instance.eventDate) {
      _writer.writeString(4, _instance.eventDate);
    }
  }

  private _eventLogId?: string;
  private _eventId?: string;
  private _eventName?: string;
  private _eventDate?: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of ExportParkingEventReport to deeply clone from
   */
  constructor(_value?: RecursivePartial<ExportParkingEventReport.AsObject>) {
    _value = _value || {};
    this.eventLogId = _value.eventLogId;
    this.eventId = _value.eventId;
    this.eventName = _value.eventName;
    this.eventDate = _value.eventDate;
    ExportParkingEventReport.refineValues(this);
  }
  get eventLogId(): string | undefined {
    return this._eventLogId;
  }
  set eventLogId(value: string | undefined) {
    this._eventLogId = value;
  }
  get eventId(): string | undefined {
    return this._eventId;
  }
  set eventId(value: string | undefined) {
    this._eventId = value;
  }
  get eventName(): string | undefined {
    return this._eventName;
  }
  set eventName(value: string | undefined) {
    this._eventName = value;
  }
  get eventDate(): string | undefined {
    return this._eventDate;
  }
  set eventDate(value: string | undefined) {
    this._eventDate = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    ExportParkingEventReport.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): ExportParkingEventReport.AsObject {
    return {
      eventLogId: this.eventLogId,
      eventId: this.eventId,
      eventName: this.eventName,
      eventDate: this.eventDate
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
  ): ExportParkingEventReport.AsProtobufJSON {
    return {
      eventLogId: this.eventLogId,
      eventId: this.eventId,
      eventName: this.eventName,
      eventDate: this.eventDate
    };
  }
}
export module ExportParkingEventReport {
  /**
   * Standard JavaScript object representation for ExportParkingEventReport
   */
  export interface AsObject {
    eventLogId?: string;
    eventId?: string;
    eventName?: string;
    eventDate?: string;
  }

  /**
   * Protobuf JSON representation for ExportParkingEventReport
   */
  export interface AsProtobufJSON {
    eventLogId?: string;
    eventId?: string;
    eventName?: string;
    eventDate?: string;
  }
}
