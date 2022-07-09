import { SocketEmitType } from "@app/core/enums/socket/socket_emit_type";

export interface SocketPayload {
    emitType: SocketEmitType;
    payloadType: string;
    payload: any;
}