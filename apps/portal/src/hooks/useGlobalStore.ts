import { create } from "zustand";

// Define the type for the globalRecords
type GlobalRecords = {
  attended: number;
  incomplete: number;
  missed: number;
};

// Define the store state and actions
interface GlobalStore {
  globalRecords: GlobalRecords;
  setGlobalRecords: (newRecords: GlobalRecords) => void;
}

// Create a Zustand store with the defined types
export const useGlobalStore = create<GlobalStore>((set) => ({
  globalRecords: {
    attended: 0,
    incomplete: 0,
    missed: 0,
  },

  setGlobalRecords: (newRecords: GlobalRecords) =>
    set((state) => ({
      globalRecords: {
        ...state.globalRecords,
        ...newRecords,
      },
    })),
}));
