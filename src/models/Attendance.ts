import { createClient } from "@/utils/supabase/client";

import { Student } from "./Student";

const supabase = createClient();

export interface Attendance {
  id: number | null;
  created_at: string;
  student_id: number;
  time_in: string;
  time_out: string | null;
  is_am: boolean | null;
}

export interface QueuedAttendance extends Attendance {
  student: Student;
}

const getCurrentTime = () => new Date().toISOString().slice(11, 19); // Current time in HH:MM:SS

const isAm = () => new Date().getHours() < 12; // Assuming AM is before 12 PM

const getTodayDateRange = () => {
  const today = new Date().toISOString().slice(0, 10); // Today's date in YYYY-MM-DD
  const startOfDay = `${today}T00:00:00.000Z`; // Start of today's date in ISO format
  const endOfDay = `${today}T23:59:59.999Z`; // End of today's date in ISO format
  return { startOfDay, endOfDay };
};

const fetchTodayRecords = async (studentId: number) => {
  const { startOfDay, endOfDay } = getTodayDateRange();

  const { data, error } = await supabase
    .from("attendance")
    .select("*")
    .eq("student_id", studentId)
    .gte("created_at", startOfDay)
    .lte("created_at", endOfDay)
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(
      "Error fetching today's attendance records: " + error.message
    );
  }
  return data as Attendance[];
};

const hasCompleteRecords = (records: Attendance[]) => {
  return (
    records.length >= 2 &&
    records.every((record) => record.time_in && record.time_out)
  );
};

const findIncompleteRecord = (records: Attendance[]) => {
  return records.find((record) => !record.time_out);
};

export const createAttendanceRecord = async (studentId: number) => {
  const currentTime = getCurrentTime();
  const currentIsAm = isAm();
  const records = await fetchTodayRecords(studentId);

  if (hasCompleteRecords(records)) {
    console.log(
      "Student already has two complete attendance records for today."
    );
    return null;
  }

  const incompleteRecord = findIncompleteRecord(records);

  if (incompleteRecord) {
    return {
      ...incompleteRecord,
      time_out: currentTime,
    };
  } else {
    return {
      id: null, // Indicating a new record
      created_at: new Date().toISOString(),
      student_id: studentId,
      time_in: currentTime,
      time_out: null,
      is_am: currentIsAm,
    };
  }
};

// export const createQueuedAttendanceRecord = async (student: Student) => {
//   const currentTime = getCurrentTime();
//   const currentIsAm = isAm();
//   const records = await fetchTodayRecords(student.id);

//   if (hasCompleteRecords(records)) {
//     console.log(
//       "Student already has two complete attendance records for today."
//     );
//     return null;
//   }

//   const incompleteRecord = findIncompleteRecord(records);

//   if (incompleteRecord) {
//     return {
//       ...incompleteRecord,
//       time_out: currentTime,
//     };
//   } else {
//     return {
//       student: student,
//       id: null, // Indicating a new record
//       created_at: new Date().toISOString(),
//       student_id: student.id,
//       time_in: currentTime,
//       time_out: null,
//       is_am: currentIsAm,
//     };
//   }
// };

export const createQueuedAttendanceRecord = async (
  student: Student
): Promise<QueuedAttendance | null> => {
  const currentTime = getCurrentTime();
  const currentIsAm = isAm();
  const records = await fetchTodayRecords(student.id);

  if (hasCompleteRecords(records)) {
    console.log(
      "Student already has two complete attendance records for today."
    );
    return null;
  }

  const incompleteRecord = findIncompleteRecord(records);

  if (incompleteRecord) {
    return {
      ...incompleteRecord,
      time_out: currentTime,
      student: student,
    };
  } else {
    return {
      id: null,
      created_at: new Date().toISOString(),
      student_id: student.id,
      time_in: currentTime,
      time_out: null,
      is_am: currentIsAm,
      student: student,
    };
  }
};

export const pushQueuedAttendanceRecord = async (record: QueuedAttendance) => {
  if (record.id) {
    const { error } = await supabase
      .from("attendance")
      .update({ time_out: record.time_out })
      .eq("id", record.id);
    if (error) {
      throw new Error("Error updating time out: " + error.message);
    }
    console.log("Time out recorded:", record.time_out);
  } else {
    const { error } = await supabase.from("attendance").insert({
      student_id: record.student_id,
      time_in: record.time_in,
      is_am: record.is_am,
    });
    if (error) {
      throw new Error("Error adding new attendance record: " + error.message);
    }
    console.log(
      `Time in ${record.is_am ? "AM" : "PM"} recorded:`,
      record.time_in
    );
  }
};

export const pushAttendanceRecord = async (record: Attendance) => {
  if (record.id) {
    const { error } = await supabase
      .from("attendance")
      .update({ time_out: record.time_out })
      .eq("id", record.id);
    if (error) {
      throw new Error("Error updating time out: " + error.message);
    }
    console.log("Time out recorded:", record.time_out);
  } else {
    const { error } = await supabase.from("attendance").insert({
      student_id: record.student_id,
      time_in: record.time_in,
      is_am: record.is_am,
    });
    if (error) {
      throw new Error("Error adding new attendance record: " + error.message);
    }
    console.log(
      `Time in ${record.is_am ? "AM" : "PM"} recorded:`,
      record.time_in
    );
  }
};

export const handleAttendanceRecord = async (studentId: number) => {
  try {
    const record = await createAttendanceRecord(studentId);
    if (record) {
      await pushAttendanceRecord(record);
    }
  } catch (error) {
    console.log(error);
  }
};
