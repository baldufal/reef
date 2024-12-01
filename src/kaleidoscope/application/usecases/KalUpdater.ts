import WebSocket from "ws";
import { FixturesData } from "../../domain/RestTypes";
import { KaleidoscopeMessage } from "../../domain/WebSocketMessages";
import { KalRestService } from "../KalRestService";

export class KalUpdater {
    private clients: Set<WebSocket> = new Set();
    private pollingInterval: NodeJS.Timeout | null = null;
    private latestData: FixturesData | null = null;

    constructor(
        private pollingRate: number,
        private restService: KalRestService) { }


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

    // Fetches data and sends out updates if any data available
    async fetchAndBroadcast(): Promise<void> {
        try {
            const newData = await this.restService.fetchData();
            if (newData) {
                this.latestData = newData
            }
            if (this.latestData)
                for (const client of this.clients) {
                    if (client.readyState === WebSocket.OPEN) {
                        if (newData) {
                            client.send(JSON.stringify({ messageType: "update", health: "good", data: this.latestData } as KaleidoscopeMessage));
                        } else {
                            client.send(JSON.stringify({ messageType: "update", health: "error", data: this.latestData } as KaleidoscopeMessage));
                        }
                    }
                }
        } catch (error) {
            console.error('Error during kaleidoscope broadcast:', error);
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