import create from "zustand";

// Define the type for the state
interface NavState {
  isNavHidden: boolean; // State to track whether the navigation is hidden
  toggleNav: () => void; // Function to toggle the navigation state
  setIsNavHidden: (hidden: boolean) => void; // Function to directly set the navigation state
}

// Create the Zustand store
const useNavStore = create<NavState>((set) => ({
  isNavHidden: false, // Initial state: navigation is visible
  toggleNav: () => set((state) => ({ isNavHidden: !state.isNavHidden })), // Toggle function
  setIsNavHidden: (hidden: boolean) => set({ isNavHidden: hidden }), // Direct set function
}));

export default useNavStore;
