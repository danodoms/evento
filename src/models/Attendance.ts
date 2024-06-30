import { createClient } from "@/utils/supabase/client";
import { Student } from "./Student";
import useQueuedAttendanceStore from "@/store/useQueuedAttendanceStore";

const supabase = createClient();

export interface Attendance {
  id: number | null;
  date: string;
  studentId: number;
  timeIn: string;
  timeOut: string | null;
}

export interface QueuedAttendance extends Attendance {
  student: Student;
}

const getCurrentTime = (): string => new Date().toISOString().slice(11, 19);

const getTodayDateRange = () => {
  const today = new Date().toISOString().slice(0, 10);
  return {
    today,
    startOfDay: `${today}T00:00:00.000Z`,
    endOfDay: `${today}T23:59:59.999Z`,
  };
};

const convertQueuedAttendanceToAttendance = (
  queuedAttendances: QueuedAttendance[]
): Attendance[] => {
  return queuedAttendances.map(({ student, ...attendance }) => attendance);
};

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

  console.log("TODAY'S ATTENDANCE RECORDS: ", data);

  const attendanceQueue = useQueuedAttendanceStore.getState().attendanceQueue;

  const attendanceFromQueue =
    convertQueuedAttendanceToAttendance(attendanceQueue);

  console.log("ATTENDANCE FROM QUEUE: ", attendanceFromQueue);

  return [...data, ...attendanceFromQueue] as Attendance[];
};

const hasCompleteRecords = (records: Attendance[]): boolean => {
  const completeCount = records.filter(
    (record) => record.timeIn && record.timeOut
  ).length;
  return completeCount >= 2;
};

// const hasCompleteRecords = (records: Attendance[]): boolean =>
//   records.length >= 2 &&
//   records.every((record) => record.timeIn && record.timeOut);

// const hasCompleteRecords = (records: Attendance[]): boolean => true;

const findIncompleteRecord = (records: Attendance[]): Attendance | undefined =>
  records.find((record) => !record.timeOut);

const createAttendanceRecord = async (
  studentId: number
): Promise<Attendance | null> => {
  const records = await fetchTodayRecords(studentId);
  if (hasCompleteRecords(records)) {
    console.warn(
      "2 COMPLETE RECORDS TODAY FOUND FOR STUDENT WITH DB ID: ",
      studentId
    );
    return null;
  }

  const incompleteRecord = findIncompleteRecord(records);
  const currentTime = getCurrentTime();
  return incompleteRecord
    ? { ...incompleteRecord, timeOut: currentTime }
    : {
        id: null,
        date: new Date().toISOString(),
        studentId,
        timeIn: currentTime,
        timeOut: null,
      };
};

export const createQueuedAttendanceRecord = async (
  student: Student
): Promise<QueuedAttendance | null> => {
  const record = await createAttendanceRecord(student.id);
  return record ? { ...record, student } : null;
};

const updateRecord = async (record: Attendance): Promise<void> => {
  const { error } = await supabase
    .from("attendance")
    .update({ time_out: record.timeOut })
    .eq("id", record.id);
  if (error) throw new Error("Error updating time out: " + error.message);
};

const insertRecord = async (record: Attendance): Promise<void> => {
  const { today } = getTodayDateRange();
  const { error } = await supabase.from("attendance").insert({
    date: today,
    student_id: record.studentId,
    time_in: record.timeIn,
  });
  if (error)
    throw new Error("Error adding new attendance record: " + error.message);
};

export const pushQueuedAttendanceRecord = async (
  record: QueuedAttendance
): Promise<void> => {
  record.id ? await updateRecord(record) : await insertRecord(record);
  console.log(record.timeIn || record.timeOut);
};

export const pushAttendanceRecord = async (
  record: Attendance
): Promise<void> => {
  record.id ? await updateRecord(record) : await insertRecord(record);
  console.log(record.timeIn || record.timeOut);
};

export const handleAttendanceRecord = async (
  studentId: number
): Promise<void> => {
  try {
    const record = await createAttendanceRecord(studentId);
    if (record) await pushAttendanceRecord(record);
  } catch (error) {
    console.error(error);
  }
};
