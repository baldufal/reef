import WebSocket from 'ws';
import { ThermocontrolDataType } from './thermocontrolREST';
import { config } from '../config';
import axios from 'axios';
import { thermocontrolMockData } from './mockData';

interface TCUpdates {
    health: "good" | "error";
    data?: ThermocontrolDataType;
}

let polling: NodeJS.Timeout | null = null;
let latestData: ThermocontrolDataType | null = null;
const thermocontrolClients: Set<WebSocket> = new Set();

const startPolling = () => {
    if (polling) return; // Polling already started

    polling = setInterval(async () => {
        try {
            const newData = await fetchData();
            if (newData) {
                latestData = await fetchData();
            }
            // Broadcast the latest data to all connected /thermocontrol clients
            for (const client of thermocontrolClients) {
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
    }, config.thermocontrol_polling_rate);
};

const stopPolling = () => {
    if (polling) {
        clearInterval(polling);
        polling = null;
    }
};

export const handleTCUpdatesConnection = (ws: WebSocket) => {
    console.log('Connected to /thermocontrol/updates');

    // Add client to the set and start polling if it's the first client
    thermocontrolClients.add(ws);
    if (thermocontrolClients.size === 1) {
        startPolling();
    }

    ws.on('close', () => {
        console.log('Connection closed for /thermocontrol/updates');
        thermocontrolClients.delete(ws);
        // Stop polling if there are no more clients
        if (thermocontrolClients.size === 0) {
            stopPolling();
        }
    });
};

const fetchData = async () => {
    if(config.thermocontrol_mock)
        return thermocontrolMockData;

    try {
        const response = await axios.get<ThermocontrolDataType>(
            `${config.thermocontrol_url}/json`
        );
        return response.data as ThermocontrolDataType;
    } catch (error) {
        console.log("Error while fetching thermocontrol data: " + error)
        return null;
    }
}