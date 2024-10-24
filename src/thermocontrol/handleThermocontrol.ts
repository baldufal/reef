import WebSocket from 'ws';
import { handleThermocontrolSetMessage } from './thermocontrolSet';
import { registerWsForThermocontrolUpdates, removeWsFromThermocontrolUpdates } from './thermocontrolUpdates';
import { ThermocontrolDataType } from './thermocontrolREST';

export interface ThermocontrolMessage {
    // tokenError hints at an expired or invalid token and should be handled by the UI by logging out the user
    messageType: "update" | "error" | "tokenError";
    // should be set if message type is error or tokenError. It is a human-readable error message
    error?: string;
    data?: TCUpdates;
};

type ThermocontrolAuxData = {
    [key: string]: number | boolean | string;
};

export type TCUpdates = {
    type: "tc" | "tc_aux";
    stale: boolean;
    data?: ThermocontrolDataType;
    data_aux?: ThermocontrolAuxData;
}

export const handleThermocontrolConnection = (ws: WebSocket) => {
    registerWsForThermocontrolUpdates(ws);

    ws.on('close', () => {
        removeWsFromThermocontrolUpdates(ws);
    });


    ws.on('message', async (message: string) => {
        handleThermocontrolSetMessage(message, ws);
    });
};