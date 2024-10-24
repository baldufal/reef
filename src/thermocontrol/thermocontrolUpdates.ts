import WebSocket from 'ws';
import { ThermocontrolDataType } from './thermocontrolREST';
import { config } from '../config';
import axios from 'axios';
import { thermocontrolMockData } from './mockData';
import { startPolling_aux, stopPolling_aux } from './thermocontrolUpdates_aux';
import { TCUpdates, ThermocontrolMessage } from './handleThermocontrol';

let polling: NodeJS.Timeout | null = null;
let latestData: ThermocontrolDataType | null = null;
const thermocontrolClients: Set<WebSocket> = new Set();

// Called in regular intervals
// and after set messages (=changes)
// and after requests
export const fetch_and_distribute = async () => {
    try {
        const newData = await fetchData();
        if (newData) {
            latestData = await fetchData();
        }
        // Broadcast the latest data to all connected /thermocontrol clients
        for (const client of thermocontrolClients) {
            if (client.readyState === WebSocket.OPEN) {
                if (newData) {
                    client.send(JSON.stringify({
                        messageType: "update",
                        data: { type: "tc", stale: false, data: latestData } as TCUpdates
                    } as ThermocontrolMessage));
                } else {
                    client.send(JSON.stringify({
                        messageType: "update",
                        data: { type: "tc", stale: true, data: latestData } as TCUpdates
                    } as ThermocontrolMessage));
                }
            }
        }
    } catch (error) {
        console.error('Polling error:', error);
    }
}

const startPolling = () => {
    if (polling) return; // Polling already started

    polling = setInterval(async () => {
        fetch_and_distribute();

    }, config.thermocontrol_polling_rate);
};

const stopPolling = () => {
    if (polling) {
        clearInterval(polling);
        polling = null;
    }
};

export const registerWsForThermocontrolUpdates = (ws: WebSocket) => {
    // Add client to the set and start polling if it's the first client
    thermocontrolClients.add(ws);
    fetch_and_distribute();
    if (thermocontrolClients.size === 1) {
        startPolling();
        startPolling_aux(thermocontrolClients);
    }
}

export const removeWsFromThermocontrolUpdates = (ws: WebSocket) => {
    thermocontrolClients.delete(ws);
    // Stop polling if there are no more clients
    if (thermocontrolClients.size === 0) {
        stopPolling();
        stopPolling_aux();
    }
}

const fetchData = async () => {
    if (config.thermocontrol_mock)
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