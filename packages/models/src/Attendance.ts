// import useQueuedAttendanceStore from "@/store/useQueuedAttendanceStore";
import { createClient } from "@repo/utils/supabase";
import type { Student } from "./Student.ts";
import type { Department } from "./Department.ts";

import {
  differenceInMinutes,
  differenceInSeconds,
  parseISO,
  format,
} from "date-fns";

const supabase = createClient();

export type Attendance = {
  id: number | null;
  school_id: string;
  date: string;
  time: string;
  is_time_in: boolean;
  scanned_by_email: string;
  // is_active: boolean;
};

export type AttendanceRecord = Attendance & {
  student: Student;
  uniqueId?: number;
};

export type RecentAttendanceRecord = {
  id: number; // or number if using JavaScript numbers
  time: string; // "time without time zone" in ISO format
  date: string; // "date" in ISO format
  school_id: string; // text
  scanned_by_email: string; // text
  first_name: string; // text
  last_name: string; // text
  dept_id: number; // integer
  dept_short_name: string; // text
  dept_name: string; // text
  is_time_in: boolean; // boolean
  is_active: boolean; // boolean
};

export type GroupedAttendance = {
  date: string;
  records: Attendance[];
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

const getCurrentDate = (): string => {
  return format(new Date(), "yyyy-MM-dd");
};

const fetchTodayRecords = async (schoolId: string): Promise<Attendance[]> => {
  const today = getCurrentDate(); // This function returns the date in 'YYYY-MM-DD' format

  const { data, error } = await supabase
    .from("attendance")
    .select("*")
    .eq("school_id", schoolId)
    .eq("date", today)
    .order("date", { ascending: true });

  if (error) {
    throw new Error(
      "Error fetching today's attendance records: " + error.message
    );
  }

  return data as Attendance[];
};

const hasCompleteRecords = (records: Attendance[]): boolean =>
  records.length >= 16;

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

export const createOrUpdateAttendanceRecord = async (
  schoolId: string,
  scannedByEmail: string,
  scanModeOverride: "auto" | "in" | "out"
): Promise<Attendance | null> => {
  const records = await fetchTodayRecords(schoolId);

  if (scanModeOverride === "auto") {
    if (isEarlyTimeOut(records)) {
      throw new Error("EARLY_TIMEOUT");
    }

    if (isEarlyTimeIn(records)) {
      throw new Error("EARLY_TIMEIN");
    }
  }

  if (hasCompleteRecords(records)) {
    return null; // Exit if there are already two complete records
  }

  let isTimeIn: boolean;

  if (scanModeOverride === "auto") {
    isTimeIn = records.length % 2 === 0;
  } else {
    isTimeIn = scanModeOverride === "in";
  }

  const { data, error } = await supabase
    .from("attendance")
    .insert({
      date: getCurrentDate(),
      school_id: schoolId,
      time: getCurrentTime(),
      is_time_in: isTimeIn,
      scanned_by_email: scannedByEmail,
    } as Attendance)
    .select("*");

  if (error)
    throw new Error("Error adding new attendance record: " + error.message);

  return data[0] as Attendance;
};

//* V1
// Create or update an attendance record for a student
// export const createOrUpdateAttendanceRecord = async (
//   schoolId: string,
//   scannedByEmail: string,
// ): Promise<Attendance | null> => {
//   const records = await fetchTodayRecords(schoolId);

//   if (isEarlyTimeOut(records)) {
//     throw new Error("EARLY_TIMEOUT");
//   }

//   if (isEarlyTimeIn(records)) {
//     throw new Error("EARLY_TIMEIN");
//   }

//   if (hasCompleteRecords(records)) {
//     return null; // Exit if there are already two complete records
//   }

//   const isTimeIn = records.length % 2 === 0;

//   const { data, error } = await supabase
//     .from("attendance")
//     .insert({
//       date: getCurrentDate(),
//       school_id: schoolId,
//       time: getCurrentTime(),
//       is_time_in: isTimeIn,
//       scanned_by_email: scannedByEmail,
//     } as Attendance)
//     .select("*");

//   if (error)
//     throw new Error("Error adding new attendance record: " + error.message);

//   return data[0] as Attendance;
// };

//! DEPRECATED
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

export const getRecentAttendance = async (): Promise<
  RecentAttendanceRecord[]
> => {
  const { data, error } = await supabase
    .from("attendance_recent")
    .select("*")
    .limit(100);

  if (error) throw new Error("Error fetching attendance: " + error.message);

  return data as RecentAttendanceRecord[];
};

//* V2
export const getAllAttendance = async (): Promise<Attendance[]> => {
  const { data, error } = await supabase
    .from("attendance")
    .select("*")
    .order("date", { ascending: false })
    .order("time", { ascending: false })
    .limit(100);

  if (error) throw new Error("Error fetching attendance: " + error.message);

  return data as Attendance[];
};

//* V1
// export const getAllAttendance = async (): Promise<Attendance[]> => {
//   const { data, error } = await supabase
//     .from("attendance")
//     .select("*")
//     .order("time, date");

//   if (error) throw new Error("Error fetching attendance: " + error.message);

//   return data as Attendance[];
// };

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

// Fetch attendance records by student ID
export const getAttendanceRecordsBySchoolId = async (
  schoolId: string
): Promise<Attendance[]> => {
  const { data, error } = await supabase
    .from("attendance")
    .select("*")
    .eq("school_id", schoolId);

  if (error)
    throw new Error("Error fetching attendance records: " + error.message);

  console.log("ATTENDANCE RECORDS for school_id ", schoolId, data);

  return data as Attendance[];
};

export async function getFilteredPaginatedSchoolIds(
  currentPage: number,
  query: string,
  limit: number = 9
): Promise<{ schoolIds: string[]; count: number | null }> {
  const { data, error } = await supabase.rpc(
    "get_filtered_paginated_school_ids",
    {
      current_page: currentPage,
      search_query: query,
      limit_count: limit,
    }
  );

  if (error) {
    console.error("Error fetching filtered school IDs:", error);
    throw error;
  }

  // Extract total count from the first row if data is not empty
  const count = data.length > 0 ? data[0].total_count : 0;

  // Extract school IDs from the data
  const schoolIds = data.map((row: { school_id: any }) => row.school_id);

  console.log("school ids", data);

  return { schoolIds, count };
}
