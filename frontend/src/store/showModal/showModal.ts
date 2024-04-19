import { create } from 'zustand';

interface ModalState {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
}

export const useModalStore = create<ModalState>((set) => ({
  showModal: false,
  setShowModal: (show) => set({ showModal: show }),
}));
