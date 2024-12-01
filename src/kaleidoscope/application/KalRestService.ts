import { FixturesData } from "../domain/RestTypes";

export interface KalRestService {

    setProgram(fixture: string, program:string): Promise<void>;

    setDiscreteParameter(fixture: string, program:string, parameter: string, value: string ): Promise<void>;

    setContinuousParameter(fixture: string, program: string, parameter: string, value: number): Promise<void>;

    fetchData(): Promise<FixturesData | null>;
}