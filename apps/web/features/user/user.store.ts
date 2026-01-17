import { create } from "zustand";

import type { User } from "@/features/user/user.types";

interface CurrentUserState {
  user: User | null;
  setUser: (newUser: User | null) => void;
  resetUser: () => void;
}

const useCurrentUserStore = create<CurrentUserState>((set) => ({
  user: null,
  setUser: (newUser) => set({ user: newUser }),
  resetUser: () => set({ user: null }),
}));

export const useCurrentUser = () => useCurrentUserStore();
