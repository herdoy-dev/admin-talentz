import { create } from "zustand";

type SidebarStore = {
  isVisible: boolean;
  setVisible: () => void;
};

export const useSidebarStore = create<SidebarStore>()((set) => ({
  isVisible: false,
  setVisible: () =>
    set(({ isVisible }) => ({ isVisible: isVisible ? false : true })),
}));
