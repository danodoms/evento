import {
  collection,
  addDoc,
  setDoc,
  getDocs,
  where,
  query,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../app/firebase"; // Adjust the import path according to your project structure

import { Student } from "./Student";

export interface Attendance {
  date: string;
  eventId: string | null;
}

export interface AttendanceRecord {
  idNum: string;
  name: string;
  timeInAm: string;
  timeOutAm: string;
  timeInPm: string;
  timeOutPm: string;
}

export async function addAttendanceRecord(student: Student) {
  // find attendance document in collection with same date as current date
  // if not found create new document with date as current date
  // add record to document with studentIdNum and its name

  const currentAttendance = await getCurrentAttendance();

  if (currentAttendance) {
    // updateAttendance(currentAttendance.)
  } else {
    const newAttendance: Attendance = {
      date: getCurrentDateStr(),
      eventId: null,
    };

    const newAttendanceId = addAttendance(newAttendance);
  }
}

const getCurrentDateStr = () => {
  const date = new Date();
  return date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
};

// Helper function to get the current time in HH:mm format
const getCurrentTime = (): string => {
  const now = new Date();
  return now.toTimeString().slice(0, 5); // Format HH:mm
};

// Helper function to determine if the current time is AM or PM
const isAm = (): boolean => {
  const now = new Date();
  return now.getHours() < 12;
};

// Function to update attendance dynamically based on current state and time of day
const updateAttendance = (attendance: AttendanceRecord) => {
  const currentTime = getCurrentTime();
  const currentIsAm = isAm();

  if (currentIsAm) {
    if (attendance.timeInPm || attendance.timeOutPm) {
      console.log(
        "Cannot record AM time-in/out after PM time-in/out has started."
      );
      return;
    }

    if (!attendance.timeInAm) {
      attendance.timeInAm = currentTime;
      console.log("Time in AM recorded:", currentTime);
      return;
    }

    if (!attendance.timeOutAm) {
      attendance.timeOutAm = currentTime;
      console.log("Time out AM recorded:", currentTime);
      return;
    }
  } else {
    if (!attendance.timeInPm) {
      attendance.timeInPm = currentTime;
      console.log("Time in PM recorded:", currentTime);
      return;
    }

    if (!attendance.timeOutPm) {
      attendance.timeOutPm = currentTime;
      console.log("Time out PM recorded:", currentTime);
      return;
    }
  }
};

const getCurrentAttendance = async (): Promise<Attendance | null> => {
  try {
    const currentDateStr = getCurrentDateStr();

    // Query to find the attendance document with the current date
    const attendanceQuery = query(
      collection(db, "attendance"),
      where("date", "==", currentDateStr)
    );
    const attendanceSnapshot = await getDocs(attendanceQuery);

    if (attendanceSnapshot.empty) {
      console.log("No attendance records found for today.");
      return null;
    }

    // Assuming there's only one document for the current date
    const attendanceDoc = attendanceSnapshot.docs[0];
    const attendanceData = attendanceDoc.data() as Attendance;

    console.log("Current attendance document: ", attendanceData);
    return attendanceData;
  } catch (error) {
    console.error("Error fetching current attendance: ", error);
    return null;
  }
};

const addAttendance = async (
  attendance: Attendance
): Promise<string | null> => {
  try {
    const attendanceCollectionRef = collection(db, "attendance");
    const attendanceDocRef = await addDoc(attendanceCollectionRef, attendance);
    console.log("Attendance document created with ID: ", attendanceDocRef.id);
    return attendanceDocRef.id;
  } catch (error) {
    console.error("Error creating attendance document: ", error);
    return null;
  }
};
