export interface ChatMessage {
  text: string;
  senderId: string;
  fromMe: boolean;
  chatGroupId: string;
  createdAt: Date;
}