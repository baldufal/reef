import { KaleidoscopeCommand, KaleidoscopeMessage } from "../domain/WebSocketMessages";
import WebSocket from "ws";


export interface KalWebSocketService {
    // Parse a kaleidoscope message and return parsed command or an error message
    parseMessage(message: string): Promise<{error?: string, result? : {data: KaleidoscopeCommand, token: string}}>;

    // send a message to the client
    sendMessage(ws: WebSocket, message: KaleidoscopeMessage): void;
  }
  