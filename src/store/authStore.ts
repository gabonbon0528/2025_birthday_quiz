import { create } from "zustand";
import { User } from "firebase/auth";

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  authLoaded: boolean;
  setAuthLoaded: (loaded: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  authLoaded: false,
  setAuthLoaded: (loaded) => set({ authLoaded: loaded }),
})); 