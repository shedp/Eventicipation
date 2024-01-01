import { create } from "zustand";

interface ShowOptionsStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useShowOptions = create<ShowOptionsStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useShowOptions;
