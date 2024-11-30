import WebSocket from "ws";

import { TcUpdater } from "../../application/usecases/TcUpdater";
import { TcMessageHandler } from "../../application/usecases/TcMessageHandler";

export class WebSocketTcAdapter {

  constructor(private tcUpdater: TcUpdater,
    private tcMessageHandler: TcMessageHandler
  ) {}

  handleConnection(ws: WebSocket): void {

    this.tcUpdater.registerClient(ws);

    ws.on("message", (message) => {
      this.tcMessageHandler.handleMessage(ws, message.toString());
    });

    ws.on("close", () => {
      this.tcUpdater.unregisterClient(ws);
    });

    ws.on("error", (err) => {
      console.error("WebSocket error:", err);
    });
  }
}
