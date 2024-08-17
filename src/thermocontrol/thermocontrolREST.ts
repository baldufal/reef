import axios from 'axios';
import { config } from '../config';
import crypto from 'crypto';

export interface ThermocontrolSettableDataType {
    extra_ventilation?: number;
    max_heating_power?: number;
    target_humidity?: number;
    target_temperature?: number;
    use_ventilation_for_cooling?: boolean;
    use_ventilation_for_heating?: boolean;
}

export interface ThermocontrolDataType extends ThermocontrolSettableDataType {
    emergency_heating_is_active: boolean;
    data_age_humidity: number;
    data_age_temperature: number;
}

export const sendData = async (data: ThermocontrolSettableDataType) => {
    try {
        // Fetch nonce
        const nonceResponse = await axios.get(config.thermocontrol_url + "/nonce");
        const fetchedNonce = nonceResponse.data.nonce;

        // Build JSON string
        const jsonData = JSON.stringify({ ...data, nonce: fetchedNonce });

        // Compute HMAC
        const hmac = await computeHMAC(config.thermocontrol_key, jsonData);

        // Construct the request payload
        const payload = `${hmac}${jsonData}`;

        console.log("Sending payload: " + payload)

        // Send POST request
        await axios.post(config.thermocontrol_url + "/json", payload, {
            headers: {
                'Content-Type': 'text/plain',
            },
        });
        console.log("Payload successfully sent");
    } catch (error: any) {
        console.error("Error occurred while sending data:", error.message || error);

        // Log additional error details if available
        if (error.response) {
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
            console.error("Response headers:", error.response.headers);
        } else if (error.request) {
            console.error("Request made but no response received:", error.request);
        } else {
            console.error("Error in setting up the request:", error.message);
        }

        // Optionally, rethrow the error if you need to handle it elsewhere
        throw error;
    }
};


export async function computeHMAC(secret: string, data: string): Promise<string> {
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
        'raw',
        enc.encode(secret),
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
    );
    const signature = await crypto.subtle.sign('HMAC', key, enc.encode(data));
    return Array.from(new Uint8Array(signature))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
}