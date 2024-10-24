import WebSocket from 'ws';
import { sendData, ThermocontrolSettableDataType } from './thermocontrolREST';
import { z } from 'zod';
import { config } from '../config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ThermocontrolMessage as ThermocontrolMessage } from './handleThermocontrol';
import { changeThermocontrolMockData } from './mockData';
import { fetch_and_distribute } from './thermocontrolUpdates';
import { checkPermission, PermissionStatus } from '../common/checkToken';
import { Permission } from '../server';

const TCMessage = z.object({
    token: z.string(),
    data: z.any()
});

const TCSetSchema = z.object({
    extra_ventilation: z.number().optional(),
    max_heating_power: z.number().optional(),
    target_humidity: z.number().optional(),
    target_temperature: z.number().optional(),
    use_ventilation_for_cooling: z.boolean().optional(),
    use_ventilation_for_heating: z.boolean().optional(),
});

export const handleThermocontrolSetMessage = async (message: string, ws: WebSocket) => {
    console.log(`Received message on /thermocontrol: ${message.slice(164)}`);

    try {
        const messageJSON = JSON.parse(message);
        const firstLevelValidation = TCMessage.safeParse(messageJSON);
        if (!firstLevelValidation.success) {
            console.error('Invalid message format:', firstLevelValidation.error);
            ws.send(JSON.stringify({ messageType: "error", error: "Invalid message format: " + firstLevelValidation.error } as ThermocontrolMessage))
            return;
        }

        const { token, data } = firstLevelValidation.data;

        const messageParseResult = TCSetSchema.safeParse(data);
        if (!messageParseResult.success) {
            console.error('Invalid message format:', messageParseResult.error);
            ws.send(JSON.stringify({ messageType: "error", error: "Invalid message format: " + messageParseResult.error } as ThermocontrolMessage))
        }

        checkPermission(token, Permission.HEATING, async (permission, permissionError) => {
            switch (permission) {
                case PermissionStatus.INVALID_OR_EXPIRED:
                    ws.send(JSON.stringify({ messageType: "tokenError", error: permissionError } as ThermocontrolMessage))
                    break;
                case PermissionStatus.NO_PERMISSION:
                    ws.send(JSON.stringify({ messageType: "error", error: permissionError } as ThermocontrolMessage))
    
                    break;
                case PermissionStatus.OK:
                    if (config.thermocontrol_mock){
                        changeThermocontrolMockData(messageParseResult.data as ThermocontrolSettableDataType);
                    }else{
                        try {
                            await sendData(messageParseResult.data as ThermocontrolSettableDataType);
                            fetch_and_distribute(); // Trigger an additional thermocontrol update
                        } catch (error) {
                            console.error('Error sending data:', error);
                            ws.send(JSON.stringify({ messageType: "error", error: "Could not send data from backend to thermocontrol." } as ThermocontrolMessage))
                        }
                    }
            }
        });

    } catch (error) {
        console.error('Error processing WebSocket message:', error);
        ws.send(JSON.stringify({ messageType: "error", error: "Error processing WebSocket message." } as ThermocontrolMessage))
    }

};