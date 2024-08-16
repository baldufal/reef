import WebSocket from 'ws';
import { z } from 'zod';
import { setContinuousParameter, setDiscreteParameter, setProgram } from './kaleidoscopeREST';

const KSetSchema = z.object({
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

export const handleKaleidoscopeSetConnection = (ws: WebSocket) => {
    console.log('Connected to /kaleidoscope/set');

    ws.on('message', async (message: string) => {
        console.log(`Received message on /kaleidoscope/set: ${message}`);

        const messageJSON = JSON.parse(message);
        const firstLevelValidation = KSetSchema.safeParse(messageJSON);
        if (!firstLevelValidation.success) {
            console.error('Invalid message format:', firstLevelValidation.error);
            return;
        }
        const { action, fixture, data } = firstLevelValidation.data;
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

    });

    ws.on('close', () => {
        console.log('Connection closed for /kaleidoscope/set');
    });
};