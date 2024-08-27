import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserEmailState {
  email: string;
  setEmail: (email: string) => void;
  clearEmail: () => void;
}

export const useCurrentUserStore = create<UserEmailState>()(
  persist(
    (set) => ({
      email: "",
      setEmail: (email: string) => set({ email }),
      clearEmail: () => set({ email: "" }),
    }),
    {
      name: "user-email-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
