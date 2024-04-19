import { ChatMessage } from "./chat-message.interface";

export interface ChatGroup {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  messages: ChatMessage[];
}