import { TcMessage, TcUpdates } from "../../domain/entities/WebSocketMessages";
import WebSocket from "ws";
import { TcRestService } from "../TcRestService";

export class TcUpdater {
    private static instance: TcUpdater | null = null;
    private clients: Set<WebSocket> = new Set();
    private pollingInterval: NodeJS.Timeout | null = null;
    private latestData: TcUpdates | null = null;
    private latestDataAux: TcUpdates | null = null;

    constructor(
        private pollingRate: number,
        private restService: TcRestService) { }


    registerClient(client: WebSocket): void {
        this.clients.add(client);
        this.fetchAndBroadcast();

        if (this.clients.size === 1) {
            this.startPolling();
        }
    }

    unregisterClient(client: WebSocket): void {
        this.clients.delete(client);

        if (this.clients.size === 0) {
            this.stopPolling();
        }
    }

    // Fetches data and updates latestData
    private async fetchData(): Promise<void> {
        try {
            const newData = await this.restService.fetchData();
            if (newData) {
                this.latestData = { type: "tc", stale: false, data: newData };
            } else {
                if (this.latestData)
                    this.latestData.stale = true;
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    // Fetches aux data and updates latestDataAux
    private async fetchDataAux(): Promise<void> {
        try {
            const newData = await this.restService.fetchDataAux();
            if (newData) {
                this.latestDataAux = { type: "tc_aux", stale: false, data_aux: newData };
            } else {
                if (this.latestDataAux)
                    this.latestDataAux.stale = true;
            }
        } catch (error) {
            console.error("Error fetching aux data:", error);
        }
    }

    // Fetches data and sends out updates if any data available
    async fetchAndBroadcast(): Promise<void> {
        await this.fetchData();
        await this.fetchDataAux();

        try {
            for (const client of this.clients) {
                if (client.readyState === WebSocket.OPEN) {
                    if (this.latestData)
                        client.send(JSON.stringify({ messageType: "update", data: this.latestData} as TcMessage));
                    if (this.latestDataAux)
                        client.send(JSON.stringify({ messageType: "update", data: this.latestDataAux } as TcMessage));
                }
            }
        } catch (error) {
            console.error('Error during tc broadcast:', error);
        }
    }

    private startPolling(): void {
        if (!this.pollingInterval) {
            this.pollingInterval = setInterval(() => this.fetchAndBroadcast(), this.pollingRate);
        }
    }

    private stopPolling(): void {
        if (this.pollingInterval) {
            clearInterval(this.pollingInterval);
            this.pollingInterval = null;
        }
    }
}
