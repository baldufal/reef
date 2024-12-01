import { z } from "zod";
import WebSocket from "ws";
import { KalWebSocketService } from "../../application/KalWebSocketService";
import { KaleidoscopeCommand, KaleidoscopeMessage, KSetContinuousSchema, KSetDiscreteSchema, KSetProgramSchema, KSetSchema } from "../../domain/WebSocketMessages";

export class KalWebSocketServiceImpl implements KalWebSocketService {

    async parseMessage(message: string): Promise<{ error?: string, result?: { data: KaleidoscopeCommand; token: string; }; }> {
        let messageJSON;
        try {
            messageJSON = JSON.parse(message);
        } catch (error) {
            console.log('Error parsing message: ' + error)
            return Promise.resolve({ error: 'Error parsing message: ' + error });
        }
        const firstLevelValidation = KSetSchema.safeParse(messageJSON);
        if (!firstLevelValidation.success) {
            console.error('Invalid message format:', firstLevelValidation.error);
            return Promise.resolve({ error: 'Invalid message format: ' + firstLevelValidation.error });
        }
        const { token, action, fixture, data } = firstLevelValidation.data;

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
                return Promise.resolve({ error: 'Unknown message type: ' + action });
        }

        const nestedValidation = nestedSchema.safeParse(data);
        if (!nestedValidation.success) {
            console.error('Invalid message format:', nestedValidation.error);
            return Promise.resolve({ error: 'Invalid message format: ' + nestedValidation.error });
        }

        switch (action) {
            case "program":
                {
                    const { programName } = nestedValidation.data as z.infer<typeof KSetProgramSchema>;
                    return Promise.resolve({ result: { data: { action, fixture, programName }, token } });
                }
            case "discrete":
                {
                    const { programName, parameterName, value } = nestedValidation.data as z.infer<typeof KSetDiscreteSchema>;
                    return Promise.resolve({ result: { data: { action, fixture, programName, parameterName, value }, token } });
                }
            case "continuous":
                {
                    const { programName, parameterName, value } = nestedValidation.data as z.infer<typeof KSetContinuousSchema>;
                    return Promise.resolve({ result: { data: { action, fixture, programName, parameterName, value }, token } });
                }

        }
    }

    sendMessage(ws: WebSocket, message: KaleidoscopeMessage): void {
        ws.send(JSON.stringify(message));
    }
}