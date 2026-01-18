import { create } from "zustand";

import type { UserDTO } from "@/features/user/user.types";

interface CurrentUserState {
  resetUser: () => void;
  setUser: (newUser: null | UserDTO) => void;
  user: null | UserDTO;
}

const useCurrentUserStore = create<CurrentUserState>((set) => ({
  resetUser: () => set({ user: null }),
  setUser: (newUser) => set({ user: newUser }),
  user: null,
}));

export const useCurrentUser = () => useCurrentUserStore();
