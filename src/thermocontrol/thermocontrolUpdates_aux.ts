import WebSocket from 'ws';
import { config } from '../config';
import axios from 'axios';
import { thermocontrolAuxMockData, thermocontrolMockData } from './mockData';
import { TCUpdates } from './thermocontrolUpdates';


let polling_aux: NodeJS.Timeout | null = null;
let latestData_aux: any = null;

export const startPolling_aux = (thermocontrolClients : Set<WebSocket>) => {
    if (polling_aux) return; // Polling already started

    polling_aux = setInterval(async () => {
        try {
            const newData = await fetchData_aux();
            if (newData) {
                latestData_aux = await fetchData_aux();
            }
            // Broadcast the latest data to all connected /thermocontrol clients
            for (const client of thermocontrolClients) {
                if (client.readyState === WebSocket.OPEN) {
                    if (newData) {
                        client.send(JSON.stringify({ type: "tc_aux", stale: false, data_aux: latestData_aux } as TCUpdates));
                    } else {
                        client.send(JSON.stringify({ type: "tc_aux", stale: true, data_aux: latestData_aux } as TCUpdates));
                    }
                }
            }
        } catch (error) {
            console.error('Polling error:', error);
        }
    }, config.thermocontrol_aux_polling_rate);
};

export const stopPolling_aux = () => {
    if (polling_aux) {
        clearInterval(polling_aux);
        polling_aux = null;
    }
};

const fetchData_aux = async () => {
    if (config.thermocontrol_aux_mock)
        return thermocontrolAuxMockData;

    try {
        const response = await axios.get(
            `${config.thermocontrol_aux_url}/json`
        );
        return response.data;
    } catch (error) {
        console.log("Error while fetching thermocontrol aux data: " + error)
        return null;
    }
}