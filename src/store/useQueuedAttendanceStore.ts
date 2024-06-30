import { create } from "zustand";
import { QueuedAttendance } from "@/models/Attendance";

interface QueuedAttendanceState {
  attendanceQueue: QueuedAttendance[];
  addAttendanceQueue: (queuedAttendance: QueuedAttendance) => void;
  removeAttendanceQueue: (queuedAttendance: QueuedAttendance) => void;
  setAttendanceQueue: (attendanceQueue: QueuedAttendance[]) => void;
}

const useQueuedAttendanceStore = create<QueuedAttendanceState>((set) => ({
  attendanceQueue: [],
  addAttendanceQueue: (queuedAttendance: QueuedAttendance) =>
    set((state) => ({
      attendanceQueue: [queuedAttendance, ...state.attendanceQueue],
    })),
  removeAttendanceQueue: (queuedAttendance: QueuedAttendance) =>
    set((state) => ({
      attendanceQueue: state.attendanceQueue.filter(
        (item) => item !== queuedAttendance
      ),
    })),
  setAttendanceQueue: (attendanceQueue: QueuedAttendance[]) =>
    set({ attendanceQueue }),
}));

export default useQueuedAttendanceStore;
