import { create } from "zustand";

import { QueuedAttendance } from "@/models/Attendance";

interface QueuedAttendanceState {
  attendanceQueue: QueuedAttendance[];
  addAttendanceQueue: (queuedAttendance: QueuedAttendance) => void;
}

const useQueuedAttendanceStore = create<QueuedAttendanceState>((set) => ({
  attendanceQueue: [],
  addAttendanceQueue: (queuedAttendance: QueuedAttendance) =>
    set((state) => ({
      attendanceQueue: [queuedAttendance, ...state.attendanceQueue],
    })),
}));

export default useQueuedAttendanceStore;
