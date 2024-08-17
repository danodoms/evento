import { AttendanceRecord } from "@repo/models/Attendance";
import create from "zustand";

type AttendanceState = {
  attendanceRecords: AttendanceRecord[];
  addAttendanceRecord: (record: AttendanceRecord) => void;
};

export const useAttendanceStore = create<AttendanceState>((set) => ({
  attendanceRecords: [],
  addAttendanceRecord: (record: AttendanceRecord) =>
    set((state) => {
      // Generate a unique ID if not provided
      const uniqueId = record.uniqueId ?? new Date().getTime();
      return {
        attendanceRecords: [
          ...state.attendanceRecords,
          { ...record, uniqueId },
        ],
      };
    }),
}));
