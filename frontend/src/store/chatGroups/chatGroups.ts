import { create } from 'zustand';
import { ChatGroup } from '../../interface/chat-group.interface';
import { chatService } from '../../services/ChatService/chatService';

interface ChatGroupState {
  chatGroups: ChatGroup[];
  loading: boolean;
  error: string | null;
  setChatGroups: (groups: ChatGroup[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useChatStore = create<ChatGroupState>((set) => ({
  chatGroups: [],
  loading: true,
  error: null,
  setChatGroups: (groups) => set({ chatGroups: groups, loading: false }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error, loading: false }),
}));

export const fetchChatGroups = () => {
  const store = useChatStore.getState();
  if (!store.loading) return;

  store.setLoading(true);

  chatService.getAllChats()
    .then((response) => {
      store.setChatGroups(response);
    })
    .catch((error) => {
      store.setError(error.message || 'Erro ao buscar os grupos de chat');
    });
};
