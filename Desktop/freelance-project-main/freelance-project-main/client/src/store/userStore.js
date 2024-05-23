import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useProfileStore = create(
  devtools((set) => ({
    user: null,
    token: null,
    isLoading: false,
    setToken: (token) => set({ token }),
    setIsLoading: (isLoading) => set({ isLoading }),
    setUser: (user) => set({ user }),
  }))
);
