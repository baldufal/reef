import { FixturesData } from "../domain/RestTypes";

export interface KalRestService {

    setProgram(fixture: string, program:string): Promise<string | null>;

    setDiscreteParameter(fixture: string, program:string, parameter: string, value: string ): Promise<string | null>;

    setContinuousParameter(fixture: string, program: string, parameter: string, value: number): Promise<string | null>;

    fetchData(): Promise<FixturesData | null>;
}