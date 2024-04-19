import { create } from 'zustand';
import { ChatMessage } from '../../interface/chat-message.interface';

interface MessageState {
  messages: ChatMessage[];
  loading: boolean;
  error: string | null;
  setMessages: (messages: ChatMessage[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useMessageStore = create<MessageState>((set) => ({
  messages: [],
  loading: true,
  error: null,
  setMessages: (messages) => set({ messages, loading: false }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error, loading: false }),
}));
