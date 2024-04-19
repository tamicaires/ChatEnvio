import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ChatGroup } from '../../interface/chat-group.interface';

interface ChatGroupState {
  currentChatGroup: ChatGroup | null;
  setCurrentChatGroup: (chatGroup: ChatGroup | null) => void;
}

const createStoreWithPersist = (set: (state: ChatGroupState) => void): ChatGroupState => ({
  currentChatGroup: null,
  setCurrentChatGroup: (chatGroup) => set({ currentChatGroup: chatGroup }),
});

export const useCurrentChatGroupStore = create(
  persist(
    createStoreWithPersist,
    { name: 'current-chat-group' }
  )
);
