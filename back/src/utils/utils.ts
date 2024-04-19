import * as WebSocket from "ws";

export const broadcast = (msg: any, wss: WebSocket.Server) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(msg));
    }
  });
};

interface UserChatGroup {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  messages: {
    id: string;
    text: string;
    fromMe: boolean;
    senderId: string;
    chatGroupId: string;
    createdAt: Date;
  }[];
}

export const sortChatGroups = (userChatGroups: UserChatGroup[]): UserChatGroup[] => {
  const sortedData = userChatGroups.sort((a, b) => {
    const lastMessageA = a.messages[0];
    const lastMessageB = b.messages[0];

    if (!lastMessageA && !lastMessageB) {
      return 0;
    } else if (!lastMessageA) {
      return 1;
    } else if (!lastMessageB) {
      return -1;
    }

    return new Date(lastMessageB.createdAt).getTime() - new Date(lastMessageA.createdAt).getTime();
  });

  return sortedData;
};