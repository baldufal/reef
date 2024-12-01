import {  z } from 'zod';
import { setContinuousParameter, setDiscreteParameter, setProgram } from './kaleidoscopeREST';
import { config } from '../config';
import WebSocket from 'ws';
import { fetch_and_distribute } from './kaleidoscopeUpdates';
import { TokenService, PermissionStatus } from '../user_management/infrastructure/services/TokenService';
import { Permission } from '../user_management/domain/entities/User';
import { setContinuousParameter_mock, setDiscreteParameter_mock, setProgram_mock } from './infrastructure/mock/mockData';
import { KaleidoscopeMessage, KSetContinuousSchema, KSetDiscreteSchema, KSetProgramSchema, KSetSchema } from './domain/WebSocketMessages';


export const handleKaleidoscopeSetMessage = async (message: string, ws: WebSocket) => {
    console.log(`Received message on /kaleidoscope/set: ${message.slice(164)}`);

    let messageJSON;
    try {
        messageJSON = JSON.parse(message);
    } catch (error) {
        console.log('Error parsing message: ' + error)
        return;
    }
    const firstLevelValidation = KSetSchema.safeParse(messageJSON);
    if (!firstLevelValidation.success) {
        console.error('Invalid message format:', firstLevelValidation.error);
        return;
    }
    const { token, action, fixture, data } = firstLevelValidation.data;

    const { status, errorMessage } = await TokenService.getInstance().checkPermission(token, Permission.LIGHT)

    switch (status) {
        case PermissionStatus.INVALID_OR_EXPIRED:
            ws.send(JSON.stringify({ messageType: "tokenError", error: errorMessage } as KaleidoscopeMessage))

            break;
        case PermissionStatus.NO_PERMISSION:
            ws.send(JSON.stringify({ messageType: "error", error: errorMessage } as KaleidoscopeMessage))

            break;
        case PermissionStatus.OK:
            let nestedSchema;
            switch (action) {
                case "program":
                    nestedSchema = KSetProgramSchema;
                    break;
                case "discrete":
                    nestedSchema = KSetDiscreteSchema;
                    break;
                case "continuous":
                    nestedSchema = KSetContinuousSchema;
                    break;
                default:
                    console.error("Unknown message type: " + action);
                    return;
            }

            const nestedValidation = nestedSchema.safeParse(data);
            if (!nestedValidation.success) {
                console.error('Invalid message format:', nestedValidation.error);
                return;
            }

            switch (action) {
                case "program":
                    {
                        const { programName } = nestedValidation.data as z.infer<typeof KSetProgramSchema>;
                        if (config.kaleidoscope_mock) {
                            setProgram_mock(fixture, programName);
                        } else {
                            setProgram(fixture, programName);
                        }
                        break;
                    }
                case "discrete":
                    {
                        const { programName, parameterName, value } = nestedValidation.data as z.infer<typeof KSetDiscreteSchema>;
                        if (config.kaleidoscope_mock) {
                            setDiscreteParameter_mock(fixture, programName, parameterName, value);
                        } else {
                            setDiscreteParameter(fixture, programName, parameterName, value);
                        }
                        break;
                    }
                case "continuous":
                    {
                        const { programName, parameterName, value } = nestedValidation.data as z.infer<typeof KSetContinuousSchema>;
                        if (config.kaleidoscope_mock) {
                            setContinuousParameter_mock(fixture, programName, parameterName, value);
                        } else {
                            setContinuousParameter(fixture, programName, parameterName, value);
                        }
                        break;
                    }
            }
            fetch_and_distribute();
    }
};