import axios from "axios";
import { config } from "../../../config";
import { thermocontrolAuxMockData, thermocontrolMockData } from "../mock/mockData";
import { TcDataType, TcSettableDataType } from "../../domain/entities/RestMessages";
import { TcRestService } from "../../application/TcRestService";
import { tcLogger } from "../../../logging";
export class TcRestServiceImpl implements TcRestService {

    async fetchDataAux(): Promise<any | null> {
        if (config.thermocontrol_aux_mock)
            return Promise.resolve(thermocontrolAuxMockData);

        try {
            const response = await axios.get(
                `${config.thermocontrol_aux_url}/json`
            );
            return response.data;
        } catch (error) {
            tcLogger.warn("Error while fetching thermocontrol aux data: " + error)
            return null;
        }
    }

    async fetchData(): Promise<TcDataType | null> {
        if (config.thermocontrol_mock)
            return thermocontrolMockData;

        try {
            const response = await axios.get<TcDataType>(
                `${config.thermocontrol_url}/json`
            );
            return response.data as TcDataType;
        } catch (error) {
            tcLogger.warn("Error while fetching thermocontrol data: " + error)
            return null;
        }
    }

    async sendData(data: TcSettableDataType): Promise<void> {
        try {
            const nonceResponse = await axios.get(config.thermocontrol_url + "/nonce");
            const fetchedNonce = nonceResponse.data.nonce;

            const jsonData = JSON.stringify({ ...data, nonce: fetchedNonce });

            const hmac = await this.computeHMAC(config.thermocontrol_key, jsonData);

            const payload = `${hmac}${jsonData}`;
            const url = config.thermocontrol_url + "/json";

            tcLogger.info("Sending thermocontrol data to: " + url)
            await axios.post(url, payload, {
                headers: {
                    'Content-Type': 'text/plain',
                },
            });
        } catch (error: any) {
            tcLogger.error("Error occurred while sending data:", error.message || error);
        }
    };


    private async computeHMAC(secret: string, data: string): Promise<string> {
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
}