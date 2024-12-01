import WebSocket from "ws";
import { KalUpdater } from "../../application/usecases/KalUpdater";
import { KaleidoscopeSet } from "../../application/usecases/KaleidoscopeSet";


export class KalWebSocketAdapter {

  constructor(
    private kalUpdater: KalUpdater,
    private kalSet: KaleidoscopeSet
  ) {}

  handleConnection(ws: WebSocket): void {

    this.kalUpdater.registerClient(ws);

    ws.on("message", (message) => {
      this.kalSet.handleMessage(ws, message.toString());
    });

    ws.on("close", () => {
      this.kalUpdater.unregisterClient(ws);
    });

    ws.on("error", (err) => {
      console.error("WebSocket error:", err);
    });
  }
}
