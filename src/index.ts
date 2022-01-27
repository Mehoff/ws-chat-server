import WebSocket, { RawData } from "ws";

const wsServer = new WebSocket.Server({ port: 4444 });

wsServer.on("connection", (client: WebSocket) => {
  client.on("message", (data: RawData, isBinary: boolean) => {
    console.log(data);
    client.send("Hello, from server!");
  });

  client.on("close", (code: number, reason: Buffer) => {
    console.log(`Client closed connection with code: ${code}`);
  });
});

wsServer.on("listening", () => {
  console.log("Server is listening...");
});
