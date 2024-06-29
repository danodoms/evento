import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export interface Attendance {
  id: number;
  created_at: string;
  student_id: number;
  time_in: string | null;
  time_out: string | null;
  is_am: boolean | null;
}

export interface Student {
  id: number;
  created_at: string;
  id_num: string;
  name: string;
  dept_id: number | null;
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

const updateRecordTimeout = async (recordId: number, currentTime: string) => {
  const { error } = await supabase
    .from("attendance")
    .update({ time_out: currentTime })
    .eq("id", recordId);
  if (error) {
    throw new Error("Error updating time out: " + error.message);
  }
};

const insertNewRecord = async (
  studentId: number,
  currentTime: string,
  currentIsAm: boolean
) => {
  const { error } = await supabase.from("attendance").insert({
    student_id: studentId,
    time_in: currentTime,
    is_am: currentIsAm,
  });
  if (error) {
    throw new Error("Error adding new attendance record: " + error.message);
  }
};

export const handleAttendanceRecord = async (studentId: number) => {
  try {
    const currentTime = getCurrentTime();
    const currentIsAm = isAm();
    const records = await fetchTodayRecords(studentId);

    if (hasCompleteRecords(records)) {
      console.log(
        "Student already has two complete attendance records for today."
      );
      return;
    }

    const incompleteRecord = findIncompleteRecord(records);

    if (incompleteRecord) {
      await updateRecordTimeout(incompleteRecord.id, currentTime);
      console.log("Time out recorded:", currentTime);
    } else {
      await insertNewRecord(studentId, currentTime, currentIsAm);
      console.log(
        `Time in ${currentIsAm ? "AM" : "PM"} recorded:`,
        currentTime
      );
    }
  } catch (error) {
    // console.error(error.message);
    console.log(error);
  }
};
