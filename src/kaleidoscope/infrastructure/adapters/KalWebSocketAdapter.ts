import WebSocket from "ws";
import { KalUpdater } from "../../application/usecases/KalUpdater";
import { KaleidoscopeSet } from "../../application/usecases/KaleidoscopeSet";
import { kalLogger } from "../../../logging";


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
      kalLogger.error("WebSocket error:", err);
    });
  }
}
