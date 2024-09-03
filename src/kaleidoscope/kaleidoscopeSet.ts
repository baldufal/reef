import { z } from 'zod';
import { setContinuousParameter, setDiscreteParameter, setProgram } from './kaleidoscopeREST';
import { config } from '../config';
import { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import { KaleidoscopeMessage } from './handleKaleidoscope';
import WebSocket from 'ws';


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

const validateToken = (token: string, callback: (result: string) => void) => {
    jwt.verify(token, config.jwt_secret, (err, decoded) => {
        if (err) {
            console.log(`Token not valid or expired`);
            callback('Token not valid for setting kaleidoscope data');
        } else {
            try {
                const payload = decoded as JwtPayload;
                if (payload.username === "admin") {
                    callback("Valid");
                } else {
                    callback('Token not valid for setting kaleidoscope data');
                }
            } catch {
                console.log(`Invalid user`);
                callback('Token not valid for setting kaleidoscope data');
            }
        }
    });
};

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



    validateToken(token, (result) => {
        if (result != "Valid")
            ws.send(JSON.stringify({ messageType: "error", error: result } as KaleidoscopeMessage))
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