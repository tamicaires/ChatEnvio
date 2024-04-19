export interface ChatGroup {
  id: string;
  name: string;
  description: string;
  createdAt: Date
}

export interface CreateChatGroup {
  name: string;
  description?: string;
}