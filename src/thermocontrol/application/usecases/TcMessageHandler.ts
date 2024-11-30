import { config } from "../../../config";
import { Permission } from "../../../user_management/domain/entities/User";
import { TokenService, PermissionStatus } from "../../../user_management/infrastructure/services/TokenService";
import { TcMessage } from "../../domain/entities/WebSocketMessages";
import WebSocket from "ws";
import { changeThermocontrolMockData } from "../../infrastructure/mock/mockData";
import { TcWebSocket } from "../TcWebSocket";
import { TcUpdater } from "./TcUpdater";
import { TcRestService } from "../TcRestService";

export class TcMessageHandler {

    constructor(
        private tcWebSocket: TcWebSocket,
        private tcRestService: TcRestService,
        private tcUpdater: TcUpdater) { }

    async handleMessage(ws: WebSocket, message: string): Promise<void> {
        const { error, result } = await this.tcWebSocket.parseMessage(message);
        if (error) {
            this.tcWebSocket.sendMessage(ws, { messageType: "error", error: error } as TcMessage);
        }
        const data = result!.data;
        const token = result!.token;

        const { status, errorMessage } = await TokenService.getInstance().checkPermission(token, Permission.HEATING);

        switch (status) {
            case PermissionStatus.INVALID_OR_EXPIRED:
                this.tcWebSocket.sendMessage(ws, { messageType: "tokenError", error: errorMessage });
                break;
            case PermissionStatus.NO_PERMISSION:
                this.tcWebSocket.sendMessage(ws, { messageType: "error", error: errorMessage });
                break;
            case PermissionStatus.OK:
                if (config.thermocontrol_mock) {
                    changeThermocontrolMockData(data);
                    break;
                }
                try {
                    await this.tcRestService.sendData(data);
                    this.tcUpdater.fetchAndBroadcast(); // Trigger an additional thermocontrol update
                } catch (error) {
                    console.error('Error sending data:', error);
                    this.tcWebSocket.sendMessage(ws, { messageType: "error", error: "Could not send data from backend to thermocontrol." });
                }
        }
    }
}