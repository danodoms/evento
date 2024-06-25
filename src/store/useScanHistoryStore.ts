import { create } from "zustand";

interface User {
  id: string;
  name: string;
}

interface ScanHistoryState {
  scanHistory: User[];
  addScanHistory: (user: User) => void;
}

const useScanHistoryStore = create<ScanHistoryState>((set) => ({
  scanHistory: [],
  addScanHistory: (user: User) =>
    set((state) => ({
      scanHistory: [user, ...state.scanHistory],
    })),
}));

export default useScanHistoryStore;
