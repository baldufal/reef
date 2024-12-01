import axios from "axios";
import { KalRestService } from "../../application/KalRestService";
import { FixturesData } from "../../domain/RestTypes";
import { kaleidoscopeMockData } from "../mock/mockData";

export class KalRestServiceImpl implements KalRestService {

    constructor(
        private kaleidoscopeUrl: string,
        private kaleidoscopeMock: boolean
    ) { }

    async fetchData(): Promise<FixturesData | null> {
        if (this.kaleidoscopeMock)
            return Promise.resolve(kaleidoscopeMockData as FixturesData);

        return (await axios.get<any>(`${this.kaleidoscopeUrl}/api/v1/fixtures`)).data as FixturesData;
    }

    async setProgram(fixture: string, program: string): Promise<string | null> {
        const url = `${this.kaleidoscopeUrl}/api/v1/fixtures/${fixture}/set_active_program`;
        const payload = program;
        return this.sendData(url, payload);
    }

    async setDiscreteParameter(fixture: string, program: string, parameter: string, value: string): Promise<string | null> {
        const payload = JSON.stringify({ type: "discrete", level: value })
        const url = `${this.kaleidoscopeUrl}/api/v1/fixtures/${fixture}/programs/${program}/parameters/${parameter}`;
        return this.sendData(url, payload);
    }

    async setContinuousParameter(fixture: string, program: string, parameter: string, value: number): Promise<string | null> {
        const payload = JSON.stringify({ type: "continuous", value: value })
        const url = `${this.kaleidoscopeUrl}/api/v1/fixtures/${fixture}/programs/${program}/parameters/${parameter}`;
        return this.sendData(url, payload);
    }

    private sendData = async (url: string, payload: string): Promise<string | null> => {
        console.log(`Sending ${payload} to ${url}`)
        try {
            await axios.post(url, payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return null;
        } catch (error) {
            return "error";
        }
    }
}