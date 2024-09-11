import { z } from 'zod';
import { setContinuousParameter, setDiscreteParameter, setProgram } from './kaleidoscopeREST';
import { config } from '../config';
import { KaleidoscopeMessage } from './handleKaleidoscope';
import WebSocket from 'ws';
import { checkPermission } from '../common/checkToken';
import { Permission } from '../server';


const KSetSchema = z.object({
    token: z.string(),
    action: z.enum(["program", "discrete", "continuous"]),
    fixture: z.string(),
    data: z.any(),
});

const KSetProgramSchema = z.object({
    programName: z.string()
});

const KSetDiscreteSchema = z.object({
    programName: z.string(),
    parameterName: z.string(),
    value: z.string(),
});

const KSetContinuousSchema = z.object({
    programName: z.string(),
    parameterName: z.string(),
    value: z.number(),
});



export const handleKaleidoscopeSetMessage = (message: string, ws: WebSocket) => {
    console.log(`Received message on /kaleidoscope/set: ${message}`);

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



    checkPermission(token, Permission.LIGHT, (permission, error) => {
        if (!permission)
            ws.send(JSON.stringify({ messageType: "error", error: error } as KaleidoscopeMessage))
        else {

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

            if (config.kaleidoscope_mock)
                return;

            switch (action) {
                case "program":
                    {
                        const { programName } = nestedValidation.data as z.infer<typeof KSetProgramSchema>;
                        setProgram(fixture, programName)
                        return;
                    }
                case "discrete":
                    {
                        const { programName, parameterName, value } = nestedValidation.data as z.infer<typeof KSetDiscreteSchema>;
                        setDiscreteParameter(fixture, programName, parameterName, value);
                        return;
                    }
                case "continuous":
                    {
                        const { programName, parameterName, value } = nestedValidation.data as z.infer<typeof KSetContinuousSchema>;
                        setContinuousParameter(fixture, programName, parameterName, value);
                        return;
                    }
            }
        }
    });
};