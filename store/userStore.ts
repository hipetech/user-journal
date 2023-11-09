import { create } from "zustand";

import { User } from "@/types/user";

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useUserStore = create<UserState>((setState) => ({
  user: null,
  setUser: (user: User | null) => setState(() => ({ user }))
}));
