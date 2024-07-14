import useQueuedAttendanceStore from "@/store/useQueuedAttendanceStore";
import { createClient } from "@/utils/supabase/client";
import type { Student } from "./Student";

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
};

export type QueuedAttendance = Attendance & {
	student: Student;
	uniqueId: number;
	performed: boolean;
};

const getCurrentTime = (): string => {
	const now = new Date();
	return now.toLocaleTimeString("en-US", { hour12: false });
};

const getTodayDateRange = () => {
	const today = new Date().toISOString().slice(0, 10);
	return {
		today,
		startOfDay: `${today}T00:00:00.000Z`,
		endOfDay: `${today}T23:59:59.999Z`,
	};
};

const convertQueuedAttendanceToAttendance = (
	queuedAttendances: QueuedAttendance[],
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
			"Error fetching today's attendance records: " + error.message,
		);

	console.log("TODAY'S ATTENDANCE RECORDS: ", data);

	const attendanceQueue = useQueuedAttendanceStore.getState().attendanceQueue;

	const attendanceFromQueue = convertQueuedAttendanceToAttendance(
		attendanceQueue,
	).filter((record) => record.student_id === studentId);

	console.log("ATTENDANCE FROM QUEUE: ", attendanceFromQueue);
	console.log("COMBINED RECORDS: ", [...data, ...attendanceFromQueue]);

	return [...data, ...attendanceFromQueue] as Attendance[];
};

const hasCompleteRecords = (records: Attendance[]): boolean => {
	const completeCount = records.filter(
		(record) => record.time_in && record.time_out,
	).length;
	return completeCount >= 2;
};

// const hasCompleteRecords = (records: Attendance[]): boolean =>
//   records.length >= 2 &&
//   records.every((record) => record.timeIn && record.timeOut);

// const hasCompleteRecords = (records: Attendance[]): boolean => true;

// Helper function to find the first incomplete attendance record (one without a timeOut).
const findIncompleteRecord = (
	records: Attendance[],
): Attendance | undefined => {
	return records.find((record) => !record.time_out);
};

// Main function to create or update an attendance record for a student.
const createAttendanceRecord = async (
	studentId: number,
): Promise<Attendance | null> => {
	// Fetch today's attendance records for the given student.
	const records = await fetchTodayRecords(studentId);

	// Check if there are already two complete records for today.
	if (hasCompleteRecords(records)) {
		console.warn(
			"2 COMPLETE RECORDS TODAY FOUND FOR STUDENT WITH DB ID: ",
			studentId,
		);
		return null; // Exit early if there are already two complete records.
	} else {
		console.log(
			"NO COMPLETE RECORDS TODAY FOUND FOR STUDENT WITH DB ID: ",
			studentId,
		);
	}

	// Find the first incomplete record (one without a timeOut).
	const incompleteRecord = findIncompleteRecord(records);
	const currentTime = getCurrentTime();

	// If an incomplete record is found, update it with the current time as timeOut.
	if (incompleteRecord) {
		console.log("INCOMPLETE RECORD FOUND FOR STUDENT WITH DB ID: ", studentId);
		console.log("INCOMPLETE RECORD: ", incompleteRecord);

		const newRecord: Attendance = {
			...incompleteRecord,
			time_out: currentTime,
		};

		console.log("WILL BE REPLACED WITH NEW RECORD: ", newRecord);
		return newRecord;
	}

	// If no incomplete record is found, create a new record with the current time as timeIn.

	const newTimeInRecord: Attendance = {
		id: null,
		date: new Date().toISOString(),
		student_id: studentId,
		time_in: currentTime,
		time_out: null,
	};

	return newTimeInRecord;
};

export const createQueuedAttendanceRecord = async (
	student: Student,
): Promise<QueuedAttendance | null> => {
	const record = await createAttendanceRecord(student.id);
	return record ? { ...record, student, uniqueId: 0, performed: false } : null;
};

const addTimeOut = async (record: Attendance): Promise<void> => {
	const { error } = await supabase
		.from("attendance")
		.update({ time_out: record.time_out })
		.eq("id", record.id);
	if (error) throw new Error("Error updating time out: " + error.message);
};

const addTimeIn = async (record: Attendance): Promise<void> => {
	const { today } = getTodayDateRange();
	const { error } = await supabase.from("attendance").insert({
		date: today,
		student_id: record.student_id,
		time_in: record.time_in,
	});
	if (error)
		throw new Error("Error adding new attendance record: " + error.message);
};

export const pushQueuedAttendanceRecord = async (
	record: QueuedAttendance,
): Promise<void> => {
	record.id ? await addTimeOut(record) : await addTimeIn(record);

	if (record.time_in) {
		console.log("Time In:", record.time_in);
		console.log(".");
		console.log(".");
		console.log(".");
	} else if (record.time_out) {
		console.log("Time Out:", record.time_out);
		console.log(".");
		console.log(".");
		console.log(".");
	}
};

export const pushAttendanceRecord = async (
	record: Attendance,
): Promise<void> => {
	record.id ? await addTimeOut(record) : await addTimeIn(record);

	if (record.time_in) {
		console.log("Time In:", record.time_in);
	} else if (record.time_out) {
		console.log("Time Out:", record.time_out);
	}
};

export const handleAttendanceRecord = async (
	studentId: number,
): Promise<void> => {
	try {
		const record = await createAttendanceRecord(studentId);
		if (record) await pushAttendanceRecord(record);
	} catch (error) {
		console.error(error);
	}
};

// export const getAllAttendanceRecords = async (): Promise<
//   AttendanceRecord[]
// > => {
//   const { data, error } = await supabase.from("attendance").select("*");

//   if (error) {
//     throw new Error("Error fetching attendance records: " + error.message);
//   }

//   console.log("All attendance records: ", data);
//   return data;
// };

export async function getAllAttendanceRecords(): Promise<AttendanceRecord[]> {
	const { data, error } = await supabase.from("attendance").select(`
            *,
            student:students!attendance_studentId_fkey(school_id, name)
        `);

	if (error) {
		console.error("Error fetching data:", error);
		// return null;
	}

	console.log("All attendance records: ", data);
	return data as AttendanceRecord[];
}


