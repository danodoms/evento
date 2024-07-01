import { create } from "zustand";
import { QueuedAttendance } from "@/models/Attendance";

// In-memory unique ID counter
let uniqueIdCounter = 0;

interface QueuedAttendanceState {
  attendanceQueue: QueuedAttendance[];
  addAttendanceQueue: (
    queuedAttendance: Omit<QueuedAttendance, "uniqueId">
  ) => void;
  removeAttendanceQueue: (uniqueId: number) => void;

  setAttendanceQueue: (attendanceQueue: QueuedAttendance[]) => void;
}

const useQueuedAttendanceStore = create<QueuedAttendanceState>((set) => ({
  attendanceQueue: [],
  addAttendanceQueue: (queuedAttendance) =>
    set((state) => {
      const newAttendance = {
        ...queuedAttendance,
        uniqueId: uniqueIdCounter++,
      };
      console.log(
        "ATTENDANCE QUEUE VALUES: ",
        useQueuedAttendanceStore.getState().attendanceQueue
      ); // Log the new value
      return {
        attendanceQueue: [...state.attendanceQueue, newAttendance],
      };
    }),

  removeAttendanceQueue: (uniqueId: number) =>
    set((state) => ({
      attendanceQueue: state.attendanceQueue.filter(
        (item) => item.uniqueId !== uniqueId
      ),
    })),

  setAttendanceQueue: (attendanceQueue: QueuedAttendance[]) =>
    set({ attendanceQueue }),
}));

export default useQueuedAttendanceStore;
