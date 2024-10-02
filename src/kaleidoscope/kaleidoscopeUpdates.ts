import WebSocket from 'ws';
import { config } from '../config';
import axios from 'axios';
import { KaleidoscopeMessage } from './handleKaleidoscope';
import { FixturesData } from './kaleidoscopeTypes';
import { kaleidoscopeMockData } from './mockData';

let polling: NodeJS.Timeout | undefined = undefined;
let latestData: FixturesData | undefined = undefined;
const kaleidoscopeClients: Set<WebSocket> = new Set();

export const fetch_and_distribute = async () => {
    try {
        const newData = await fetchData();
        if (newData) {
            latestData = newData;
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
}

const startPolling = () => {
    if (polling) return; // Polling already started

    fetch_and_distribute();
    polling = setInterval(async () => {
        fetch_and_distribute();
    }, config.kaleidoscope_polling_rate);
};

const stopPolling = () => {
    if (polling) {
        clearInterval(polling);
        polling = undefined;
    }
};

const fetchData = async () => {
    if (config.kaleidoscope_mock)
        return kaleidoscopeMockData as FixturesData;
    try {
        const response = await axios.get<any>(
            `${config.kaleidoscope_url}/api/v1/fixtures`
        );
        return response.data as FixturesData;
    } catch (error) {
        console.log("Error while fetching kaleidoscope data: " + error)
        return undefined;
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
