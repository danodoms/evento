import { create } from "zustand";

// Create a Zustand store
export const useGlobalStore = create((set) => ({
  globalRecords: {
    attended: 0,
    incomplete: 0,
    missed: 0,
  },
  setGlobalRecords: (newRecords) =>
    set((state) => ({
      globalRecords: {
        ...state.globalRecords,
        ...newRecords,
      },
    })),
}));
