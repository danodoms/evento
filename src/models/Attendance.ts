import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export interface Attendance {
  id: number;
  createdAt: string;
  studentId: number;
  timeIn: string;
  timeOut: string;
  isAm: boolean;
}

// export async function addTimeIn() {
//   const { data, error } = await supabase
//     .from("attendance")
//     .insert([{ some_column: "someValue", other_column: "otherValue" }])
//     .select();
// }

const getCurrentTime = () => {
  return new Date().toISOString().slice(11, 19); // Current time in HH:MM:SS
};

const isAm = () => {
  return new Date().getHours() < 12; // Assuming AM is before 12 PM
};

export const handleAttendanceRecord = async (studentId: number) => {
  const today = new Date().toISOString().slice(0, 10); // Today's date in YYYY-MM-DD
  const startOfDay = `${today}T00:00:00.000Z`; // Start of today's date in ISO format
  const endOfDay = `${today}T23:59:59.999Z`; // End of today's date in ISO format
  const currentTime = getCurrentTime();
  const currentIsAm = isAm();

  console.log("date today is", today);

  const { data, error } = await supabase
    .from("attendance")
    .select("*")
    .eq("student_id", studentId)
    .gte("created_at", startOfDay)
    .lte("created_at", endOfDay)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching today's attendance records:", error);
    return;
  }

  // Check if the student already has two records for today and if both have timeouts
  if (data.length >= 2) {
    const [firstRecord, secondRecord] = data;
    if (
      firstRecord.time_in &&
      firstRecord.time_out &&
      secondRecord.time_in &&
      secondRecord.time_out
    ) {
      console.log(
        "Student already has two attendance records for today with timeouts."
      );
      return;
    }
  }

  // Find the first record without timeout
  const recordWithoutTimeout = data.find((record) => !record.time_out);

  if (recordWithoutTimeout) {
    const { error: updateError } = await supabase
      .from("attendance")
      .update({ time_out: currentTime })
      .eq("id", recordWithoutTimeout.id);
    if (updateError) {
      console.error("Error updating time out:", updateError);
    } else {
      console.log("Time out recorded:", currentTime);
    }
  } else {
    const { error: insertError } = await supabase.from("attendance").insert({
      student_id: studentId,
      time_in: currentTime,
      is_am: currentIsAm,
    });
    if (insertError) {
      console.error("Error adding new attendance record:", insertError);
    } else {
      console.log(
        `Time in ${currentIsAm ? "AM" : "PM"} recorded:`,
        currentTime
      );
    }
  }
};
