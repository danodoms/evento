// import useQueuedAttendanceStore from "@/store/useQueuedAttendanceStore";
import { createClient } from "@/utils/supabase/client";
import type { Student } from "./Student";
import { differenceInMinutes, differenceInSeconds, parseISO } from "date-fns";

const supabase = createClient();

export type Attendance = {
  id: number | null;
  school_id: string;
  date: string;
  time: string;
  is_time_in: boolean;
  // is_active: boolean;
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
const fetchTodayRecords = async (schoolId: string): Promise<Attendance[]> => {
  const { startOfDay, endOfDay } = getTodayDateRange();
  const { data, error } = await supabase
    .from("attendance")
    .select("*")
    .eq("school_id", schoolId)
    .gte("date", startOfDay)
    .lte("date", endOfDay)
    .order("date", { ascending: true });

  if (error)
    throw new Error(
      "Error fetching today's attendance records: " + error.message
    );

  return data as Attendance[];
};

//* V2 Check if there are two complete records for today
const hasCompleteRecords = (records: Attendance[]): boolean =>
  records.length >= 4;

//* V1
// const hasCompleteRecords = (records: Attendance[]): boolean =>
//   records.filter((record) => record.time_in && record.time_out).length >= 2;

//* V2 Check if the time out is too early
const isEarlyTimeOut = (
  records: Attendance[],
  minutesSinceTimeIn: number = 1
): boolean => {
  // If the number of records is even, return false early
  if (records.length % 2 === 0) {
    return false;
  }

  // Get the last attendance record from the array
  const lastRecord = records[records.length - 1];

  // Check if the last record exists
  if (lastRecord) {
    // Parse the time_in from the last record's date and time
    const timeIn = parseISO(`${lastRecord.date}T${lastRecord.time}`);
    const now = new Date(); // Get the current date and time

    // Calculate the difference in minutes between now and the time_in
    return differenceInMinutes(now, timeIn) < minutesSinceTimeIn;
  }

  // If no last record exists, return false
  return false;
};

//* V1
// const isEarlyTimeOut = (
//   records: Attendance[],
//   minutesSinceTimeIn: number = 1
// ): boolean => {
//   const incompleteRecord = records.find((record) => !record.time_out);
//   if (incompleteRecord) {
//     const timeIn = parseISO(
//       `${incompleteRecord.date}T${incompleteRecord.time_in}`
//     );
//     const now = new Date();
//     return differenceInMinutes(now, timeIn) < minutesSinceTimeIn;
//   }
//   return false;
// };

//* V2
const isEarlyTimeIn = (
  records: Attendance[],
  secondsSinceLastTimeOut: number = 10
): boolean => {
  // If the number of records is odd, return false early
  if (records.length % 2 !== 0) {
    return false;
  }

  // Get the last attendance record from the array
  const lastRecord = records[records.length - 1];

  // Check if the last record exists and has a time_out value
  if (lastRecord) {
    // Parse the time_out from the last record's date and time
    const lastTimeOut = parseISO(`${lastRecord.date}T${lastRecord.time}`);
    const now = new Date(); // Get the current date and time

    // Calculate the difference in seconds between now and the time_out
    return differenceInSeconds(now, lastTimeOut) < secondsSinceLastTimeOut;
  }

  // If no last record exists or it doesn't have a time_out, return false
  return false;
};

//* V1
// const isEarlyTimeIn = (
//   records: Attendance[],
//   secondsSinceLastTimeOut: number = 10
// ): boolean => {
//   const completedRecords = records.filter((record) => record.time_out);
//   if (completedRecords.length === 1) {
//     const lastRecord = completedRecords[0];
//     const lastTimeOut = parseISO(`${lastRecord.date}T${lastRecord.time_out}`);
//     const now = new Date();
//     return differenceInSeconds(now, lastTimeOut) < secondsSinceLastTimeOut;
//   }
//   return false;
// };

//! DEPRECATED - Find the first incomplete attendance record
// const findIncompleteRecord = (records: Attendance[]): Attendance | undefined =>
//   records.find((record) => !record.time_out);

// Create or update an attendance record for a student
export const createOrUpdateAttendanceRecord = async (
  schoolId: string
): Promise<Attendance | null> => {
  const records = await fetchTodayRecords(schoolId);

  if (isEarlyTimeOut(records)) {
    throw new Error("EARLY_TIMEOUT");
  }

  if (isEarlyTimeIn(records)) {
    throw new Error("EARLY_TIMEIN");
  }

  if (hasCompleteRecords(records)) {
    return null; // Exit if there are already two complete records
  }

  const isTimeIn = records.length % 2 === 0;

  const { startOfDay } = getTodayDateRange();
  const { data, error } = await supabase
    .from("attendance")
    .insert({
      date: startOfDay,
      school_id: schoolId,
      time: getCurrentTime(),
      is_time_in: isTimeIn,
    })
    .select("*");

  if (error)
    throw new Error("Error adding new attendance record: " + error.message);

  return data[0] as Attendance;
};

//! DEPRECATED
// Handle attendance record creation and pushing to the database
// export const handleAttendanceRecord = async (
//   studentId: number
// ): Promise<Attendance | null> => {
//   try {
//     return await createOrUpdateAttendanceRecord(studentId);
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };

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
