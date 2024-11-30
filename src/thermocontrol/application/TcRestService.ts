import { TcDataType, TcSettableDataType } from "../domain/entities/RestMessages";

export interface TcRestService {

    fetchData(): Promise<TcDataType | null>;

    fetchDataAux(): Promise<any | null>;

    sendData(data: TcSettableDataType): Promise<void>;
}