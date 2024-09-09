import { create } from "zustand";

type ScanMode = "auto" | "in" | "out";

interface ScanModeState {
  mode: ScanMode;
  setMode: (mode: ScanMode) => void;
}

const useScanModeStore = create<ScanModeState>((set) => ({
  mode: "auto",
  setMode: (newMode) => set({ mode: newMode }),
}));

export default useScanModeStore;
