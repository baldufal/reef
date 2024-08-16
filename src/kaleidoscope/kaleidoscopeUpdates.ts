import WebSocket from 'ws';
import { config } from '../config';
import axios from 'axios';

interface KalUpdate {
    health: "good" | "error";
    data?: any;
}

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
                        client.send(JSON.stringify({ health: "good", data: latestData }));
                    } else {
                        client.send(JSON.stringify({ health: "error", data: latestData }));
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

export const handleKalUpdatesConnection = (ws: WebSocket) => {
    console.log('Connected to /kaleidoscope/updates');

    // Add client to the set and start polling if it's the first client
    kaleidoscopeClients.add(ws);
    if (kaleidoscopeClients.size === 1) {
        startPolling();
    }

    ws.on('close', () => {
        console.log('Connection closed for /kaleidoscope/updates');
        kaleidoscopeClients.delete(ws);
        // Stop polling if there are no more clients
        if (kaleidoscopeClients.size === 0) {
            stopPolling();
        }
    });
};

const fetchData = async () => {
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