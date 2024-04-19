import express from "express";
import * as http from "http";
import * as WebSocket from "ws";
import cors from "cors";
import { router } from "./routes/routes";

const app = express();
const port = 3000;

export const server = http.createServer(app);
export const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {

  const heartbeat = () => {
    if (!ws) return;
    if (ws.readyState !== 1) return;
    ws.send(
      JSON.stringify({
        type: "heartbeat",
        msg: true,
      })
    );
    console.log("WebSocket connection established", (Math.random() * 100));
    setTimeout(heartbeat, 20000);
  };

  heartbeat();
});

wss.on("error", (error) => {
  console.error("WebSocket server error:", error);
});

wss.on("close", reason => {
  console.log('desconectado')
})

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use(router);

server.listen(port, async () => {
  console.log('Server started on port 3000 ')
});
