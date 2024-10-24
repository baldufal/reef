import WebSocket from 'ws';
import { registerWsForKaleidoscopeUpdates, removeWsFromKaleidoscopeUpdates } from "./kaleidoscopeUpdates";
import { handleKaleidoscopeSetMessage } from './kaleidoscopeSet';

export interface KaleidoscopeMessage {
    // tokenError hints at an expired or invalid token and should be handled by the UI by logging out the user
    messageType: "update" | "error" | "tokenError";
    // should be set if message type is error or tokenError. It is a human-readable error message
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