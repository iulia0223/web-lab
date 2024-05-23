import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useSocketStore = create(
  devtools((set) => ({
    socket: null,
    setSocket: (socket) => set({ socket }),
  }))
);
