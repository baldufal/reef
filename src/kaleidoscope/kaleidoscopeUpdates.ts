import WebSocket from 'ws';
import { config } from '../config';
import axios from 'axios';
import { kaleidoscopeMockData } from './mockData';
import { KaleidoscopeMessage } from './handleKaleidoscope';

let polling: NodeJS.Timeout | null = null;
let latestData: any | null = null;
const kaleidoscopeClients: Set<WebSocket> = new Set();

const startPolling = () => {
    if (polling) return; // Polling already started

    polling = setInterval(async () => {
        try {
            const newData = await fetchData();
            if (newData) {
                latestData = await fetchData();
            }
            // Broadcast the latest data to all connected /kaleidoscope clients
            for (const client of kaleidoscopeClients) {
                if (client.readyState === WebSocket.OPEN) {
                    if (newData) {
                        client.send(JSON.stringify({ messageType: "update", health: "good", data: latestData } as KaleidoscopeMessage));
                    } else {
                        client.send(JSON.stringify({ messageType: "update", health: "error", data: latestData } as KaleidoscopeMessage));
                    }
                }
            }
        } catch (error) {
            console.error('Polling error:', error);
        }
    }, config.kaleidoscope_polling_rate);
};

const stopPolling = () => {
    if (polling) {
        clearInterval(polling);
        polling = null;
    }
};

const fetchData = async () => {
    if (config.kaleidoscope_mock)
        return kaleidoscopeMockData;
    try {
        const response = await axios.get<any>(
            `${config.kaleidoscope_url}/api/v1/fixtures`
        );
        return response.data;
    } catch (error) {
        console.log("Error while fetching kaleidoscope data: " + error)
        return null;
    }
}

export const registerWsForKaleidoscopeUpdates = (ws: WebSocket) => {
    // Add client to the set and start polling if it's the first client
    kaleidoscopeClients.add(ws);
    if (kaleidoscopeClients.size === 1) {
        startPolling();
    }
}

export const removeWsFromKaleidoscopeUpdates = (ws: WebSocket) => {
    kaleidoscopeClients.delete(ws);
    // Stop polling if there are no more clients
    if (kaleidoscopeClients.size === 0) {
        stopPolling();
    }
}
