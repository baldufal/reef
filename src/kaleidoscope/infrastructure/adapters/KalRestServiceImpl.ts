import axios from "axios";
import { KalRestService } from "../../application/KalRestService";
import { FixturesData } from "../../domain/RestTypes";
import { kaleidoscopeMockData } from "../mock/mockData";
import { kalLogger } from "../../../logging";

export class KalRestServiceImpl implements KalRestService {

    constructor(
        private kaleidoscopeUrl: string,
        private kaleidoscopeMock: boolean
    ) { }

    async fetchData(): Promise<FixturesData | null> {
        if (this.kaleidoscopeMock)
            return Promise.resolve(kaleidoscopeMockData as FixturesData);
        try {
            return (await axios.get<FixturesData>(`${this.kaleidoscopeUrl}/api/v1/fixtures`)).data as FixturesData;
        } catch (error) {
            kalLogger.error("Error while fetching kaleidoscope data: " + error);
        }
        return null;
    }
    async setProgram(fixture: string, program: string): Promise<void> {
        const url = `${this.kaleidoscopeUrl}/api/v1/fixtures/${fixture}/set_active_program`;
        const payload = program;
        kalLogger.info(`Sending program to ${url}`);
        try {
            await axios.post(url, payload, {
                headers: {
                    'Content-Type': 'text/plain',
                },
            });
        } catch (error) {
            kalLogger.error("Error while sending data: " + error)
        }
    }

    async setDiscreteParameter(fixture: string, program: string, parameter: string, value: string): Promise<void> {
        const payload = JSON.stringify({ type: "discrete", level: value })
        const url = `${this.kaleidoscopeUrl}/api/v1/fixtures/${fixture}/programs/${program}/parameters/${parameter}`;
        kalLogger.info(`Sending discrete parameter to ${url}`);
        try {
            await axios.post(url, payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            kalLogger.error("Error while sending data: " + error)
        }
    }

    async setContinuousParameter(fixture: string, program: string, parameter: string, value: number): Promise<void> {
        const payload = JSON.stringify({ type: "continuous", value: value })
        const url = `${this.kaleidoscopeUrl}/api/v1/fixtures/${fixture}/programs/${program}/parameters/${parameter}`;
        kalLogger.info(`Sending payload to ${url}`);
        try {
            await axios.post(url, payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            kalLogger.error("Error while sending data: " + error)
        }
    }

}