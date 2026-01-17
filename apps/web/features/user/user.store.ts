import { create } from "zustand";

import type { User } from "@/features/user/user.types";

interface CurrentUserState {
  resetUser: () => void;
  setUser: (newUser: null | User) => void;
  user: null | User;
}

const useCurrentUserStore = create<CurrentUserState>((set) => ({
  resetUser: () => set({ user: null }),
  setUser: (newUser) => set({ user: newUser }),
  user: null,
}));

export const useCurrentUser = () => useCurrentUserStore();
