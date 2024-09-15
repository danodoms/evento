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
      const updatedRecords = [
        ...state.attendanceRecords,
        { ...record, uniqueId },
      ];

      // Log the new value of attendanceRecords
      console.log(
        "Updated zustand global state attendance records:",
        updatedRecords
      );

      return {
        attendanceRecords: updatedRecords,
      };
    }),
}));
