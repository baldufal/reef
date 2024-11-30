import { TcSettableDataType } from "../domain/entities/RestMessages";
import WebSocket from "ws";
import { TcMessage } from "../domain/entities/WebSocketMessages";


export interface TcWebSocket {
    // Parse a tc message and return parsed data or an error message
    parseMessage(message: string): Promise<{error: string | undefined, result : {data: TcSettableDataType, token: string} | undefined}>;

    // send a message to the client
    sendMessage(ws: WebSocket, message: TcMessage): void;
  }
  