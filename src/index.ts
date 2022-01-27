import WebSocket, { RawData } from "ws";
import ACTION from "./enums/actions";
import Message from "./interfaces/message.interface";
import Response from "./interfaces/response.interface";

const wsServer = new WebSocket.Server({ port: 4444 });

wsServer.on("connection", (client: WebSocket) => {
  client.on("message", (data: RawData, isBinary: boolean) => {
    try {
      const body = JSON.parse(data.toString());

      const message: Message = body;

      const res: Response = handleMessage(message);

      client.send(JSON.stringify(res));
    } catch (err) {
      throw new Error(err);
    }
  });

  // https://github.com/Luka967/websocket-close-codes
  client.on("close", (code: number, reason: Buffer) => {
    console.log(`Client closed connection with code: ${code}`);
  });
});

wsServer.on("listening", () => {
  console.log("Server is listening...");
});

const handleMessage = (message: Message): Response => {
  switch (message.action) {
    case ACTION.PING: {
      const res: Response = {
        action: ACTION.PONG,
        data: "PONG!",
        to: "Client",
      };
      return res;
    }
    case ACTION.MESSAGE: {
      const res: Response = {
        action: ACTION.MESSAGE,
        data: `Your message: ${message.data}`,
        to: "Client",
      };
      return res;
    }
    default: {
      const res: Response = {
        action: ACTION.ERROR,
        data: "[ERROR] Undefined action",
        to: "Client",
      };
      return res;
    }
  }
};
