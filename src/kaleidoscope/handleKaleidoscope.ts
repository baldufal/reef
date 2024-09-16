import WebSocket from 'ws';
import { registerWsForKaleidoscopeUpdates, removeWsFromKaleidoscopeUpdates } from "./kaleidoscopeUpdates";
import { handleKaleidoscopeSetMessage } from './kaleidoscopeSet';

export interface KaleidoscopeMessage {
    messageType: "update" | "error";
    error?: string;
    health?: "good" | "error";
    data?: any;
};

export const handleKaleidoscopeConnection = (ws: WebSocket) => {
    registerWsForKaleidoscopeUpdates(ws);

    ws.on('close', () => {
        removeWsFromKaleidoscopeUpdates(ws);
    });


    ws.on('message', async (message: string) => {
        handleKaleidoscopeSetMessage(message, ws);
    });
};