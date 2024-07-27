import create from "zustand";
import { type AttendanceRecord } from "@/models/Attendance";

type AttendanceState = {
  attendanceRecords: AttendanceRecord[];
  addAttendanceRecord: (record: AttendanceRecord) => void;
};

export const useAttendanceStore = create<AttendanceState>((set) => ({
  attendanceRecords: [],
  addAttendanceRecord: (record: AttendanceRecord) =>
    set((state) => ({
      attendanceRecords: [...state.attendanceRecords, record],
    })),
}));
