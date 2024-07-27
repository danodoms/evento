// import useQueuedAttendanceStore from "@/store/useQueuedAttendanceStore";
import { createClient } from "@/utils/supabase/client";
import type { Student } from "./Student";
import { differenceInMinutes, parseISO } from "date-fns";

const supabase = createClient();

export type Attendance = {
  id: number | null;
  date: string;
  student_id: number;
  time_in: string;
  time_out: string | null;
};

export type AttendanceRecord = Attendance & {
  student: Student;
  uniqueId?: number;
};

// Utility functions
const getCurrentTime = (): string =>
  new Date().toLocaleTimeString("en-US", { hour12: false });

const getTodayDateRange = () => {
  const today = new Date().toISOString().slice(0, 10);
  return {
    startOfDay: `${today}T00:00:00.000Z`,
    endOfDay: `${today}T23:59:59.999Z`,
  };
};

// Fetch today's records for a specific student
const fetchTodayRecords = async (studentId: number): Promise<Attendance[]> => {
  const { startOfDay, endOfDay } = getTodayDateRange();
  const { data, error } = await supabase
    .from("attendance")
    .select("*")
    .eq("student_id", studentId)
    .gte("date", startOfDay)
    .lte("date", endOfDay)
    .order("date", { ascending: true });

  if (error)
    throw new Error(
      "Error fetching today's attendance records: " + error.message
    );

  return data as Attendance[];
};

// Check if there are two complete records for today
const hasCompleteRecords = (records: Attendance[]): boolean =>
  records.filter((record) => record.time_in && record.time_out).length >= 2;

// Check if the time out is too early
const isEarlyTimeOut = (
  records: Attendance[],
  minutesSinceTimeIn: number = 1
): boolean => {
  const incompleteRecord = records.find((record) => !record.time_out);
  if (incompleteRecord) {
    const timeIn = parseISO(
      `${incompleteRecord.date}T${incompleteRecord.time_in}`
    );
    const now = new Date();
    return differenceInMinutes(now, timeIn) < minutesSinceTimeIn;
  }
  return false;
};

// Find the first incomplete attendance record
const findIncompleteRecord = (records: Attendance[]): Attendance | undefined =>
  records.find((record) => !record.time_out);

// Create or update an attendance record for a student
export const createOrUpdateAttendanceRecord = async (
  studentId: number
): Promise<Attendance | null> => {
  const records = await fetchTodayRecords(studentId);

  if (isEarlyTimeOut(records)) {
    throw new Error("EARLY_TIMEOUT");
  }

  if (hasCompleteRecords(records)) {
    return null; // Exit if there are already two complete records
  }

  const incompleteRecord = findIncompleteRecord(records);
  const currentTime = getCurrentTime();

  if (incompleteRecord) {
    const { data, error } = await supabase
      .from("attendance")
      .update({ time_out: currentTime })
      .eq("id", incompleteRecord.id)
      .select("*");

    if (error) throw new Error("Error updating time out: " + error.message);

    return data[0] as Attendance;
  }

  const { startOfDay } = getTodayDateRange();
  const { data, error } = await supabase
    .from("attendance")
    .insert({
      date: startOfDay,
      student_id: studentId,
      time_in: currentTime,
    })
    .select("*");

  if (error)
    throw new Error("Error adding new attendance record: " + error.message);

  return data[0] as Attendance;
};

// Handle attendance record creation and pushing to the database
export const handleAttendanceRecord = async (
  studentId: number
): Promise<Attendance | null> => {
  try {
    return await createOrUpdateAttendanceRecord(studentId);
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Fetch all attendance records with student details
export const getAllAttendanceRecords = async (): Promise<
  AttendanceRecord[]
> => {
  const { data, error } = await supabase
    .from("attendance")
    .select("*, student:students!attendance_studentId_fkey(school_id, name)");

  if (error)
    throw new Error("Error fetching attendance records: " + error.message);

  return data as AttendanceRecord[];
};

// Fetch attendance records by student ID
export const getAttendanceRecordsByStudentId = async (
  studentId: number
): Promise<Attendance[]> => {
  const { data, error } = await supabase
    .from("attendance")
    .select("*")
    .eq("student_id", studentId);

  if (error)
    throw new Error("Error fetching attendance records: " + error.message);

  return data as Attendance[];
};
