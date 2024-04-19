const clientWebSocket = () => {
  const socket = new WebSocket("ws://localhost:3000");
  return socket;
};

export default clientWebSocket;