import WebSocket from "ws";
import { Permission } from "../../../user_management/domain/entities/User";
import { TokenService, PermissionStatus } from "../../../user_management/infrastructure/services/TokenService";
import { KaleidoscopeMessage } from "../../domain/WebSocketMessages";
import { KalRestService } from "../KalRestService";
import { KalWebSocketService } from "../KalWebSocketService";
import { KalUpdater } from "./KalUpdater";
import { setContinuousParameter_mock, setDiscreteParameter_mock, setProgram_mock } from "../../infrastructure/mock/mockData";
import { setContinuousParameter } from "../../kaleidoscopeREST";

export class KaleidoscopeSet {
    constructor(
        private restService: KalRestService,
        private webSocketService: KalWebSocketService,
        private kalUpdater: KalUpdater,
        private mockKaleidoscopeData: boolean,
    ) { }

    async handleMessage(ws: WebSocket, message: string) {
        const { error, result } = await this.webSocketService.parseMessage(message);
        if (error) {
            this.webSocketService.sendMessage(ws, { messageType: "error", error } as KaleidoscopeMessage);
            return;
        }
        if (result) {
            const { data, token } = result;
            const { status, errorMessage } = await TokenService.getInstance().checkPermission(token, Permission.LIGHT)
            switch (status) {
                case PermissionStatus.INVALID_OR_EXPIRED:
                    this.webSocketService.sendMessage(ws, { messageType: "tokenError", error: errorMessage } as KaleidoscopeMessage)
                    break;
                case PermissionStatus.NO_PERMISSION:
                    this.webSocketService.sendMessage(ws, { messageType: "tokenError", error: errorMessage } as KaleidoscopeMessage)
                    break;
                case PermissionStatus.OK:
                    switch (data.action) {
                        case "program":
                            {
                                if (this.mockKaleidoscopeData) {
                                    setProgram_mock(data.fixture, data.programName);
                                } else {
                                    this.restService.setProgram(data.fixture, data.programName);
                                }
                            }
                            break;
                        case "discrete":
                            {
                                if (this.mockKaleidoscopeData) {
                                    setDiscreteParameter_mock(data.fixture, data.programName, data.parameterName, data.value);
                                } else {
                                    this.restService.setDiscreteParameter(data.fixture, data.programName, data.parameterName, data.value);
                                }
                            }
                            break;
                        case "continuous":
                            {
                                if (this.mockKaleidoscopeData) {
                                    setContinuousParameter_mock(data.fixture, data.programName, data.parameterName, data.value);
                                } else {
                                    this.restService.setContinuousParameter(data.fixture, data.programName, data.parameterName, data.value);
                                }
                            }
                            break;
                    }
                    this.kalUpdater.fetchAndBroadcast();
            }
        }
    }
}