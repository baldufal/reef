import WebSocket from "ws";
import { TcWebSocket } from "../../application/TcWebSocket";
import { TcSettableDataType } from "../../domain/entities/RestMessages";
import { TcMessage, TCMessage, TCSetSchema } from "../../domain/entities/WebSocketMessages";

export class TcWebSocketImpl implements TcWebSocket {

    sendMessage(ws: WebSocket, message: TcMessage): void {
        ws.send(JSON.stringify(message));
    }

    async parseMessage(message: string): Promise<{ error: string | undefined; result : {data: TcSettableDataType, token: string} | undefined }> {

        try {
            const messageJSON = JSON.parse(message);
            const firstLevelValidation = TCMessage.safeParse(messageJSON);
            if (!firstLevelValidation.success) {
                console.error('Invalid message format:', firstLevelValidation.error);
                return { error: "invalid message format", result: undefined };
            }

            const { token, data } = firstLevelValidation.data;

            const messageParseResult = TCSetSchema.safeParse(data);
            if (!messageParseResult.success) {
                console.error('Invalid message format:', messageParseResult.error);
                return { error: "Invalid message format", result: undefined };
            }
            return { error: undefined, result:{data: messageParseResult.data as TcSettableDataType, token: token} };


        } catch (error) {
            console.error('Error processing WebSocket message:', error);
            return { error: "Error processing WebSocket message", result: undefined };
        }
    }
}
