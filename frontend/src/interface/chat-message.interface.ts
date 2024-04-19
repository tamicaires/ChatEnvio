export interface ChatMessage {
  id: string;
  text: string;
  senderId: string;
  sender: string;
  fromMe: boolean;
  chatGroupId: string;
  createdAt: Date;
}

export interface CreateChatMessage {
  text: string;
  fromMe: boolean;
  chatGroupId: string;
} 