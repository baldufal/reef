import WebSocket from 'ws';
import { handleThermocontrolSetMessage } from './thermocontrolSet';
import { registerWsForThermocontrolUpdates, removeWsFromThermocontrolUpdates } from './thermocontrolUpdates';

export interface ThermocontroleMessage {
    messageType: "update" | "error";
    error?: string;
    health?: "good" | "error";
    data?: any;
};

export const handleThermocontrolConnection = (ws: WebSocket) => {
    registerWsForThermocontrolUpdates(ws);

    ws.on('close', () => {
        removeWsFromThermocontrolUpdates(ws);
    });


    ws.on('message', async (message: string) => {
        handleThermocontrolSetMessage(message, ws);
    });
};