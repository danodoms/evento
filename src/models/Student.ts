import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export interface Student {
  id: number;
  created_at: string | null;
  is_active: boolean | undefined;
  school_id: string;
  name: string;
  dept_id: number | null;
}

export async function getStudentByIdNum(idNum: string) {
  const { data, error } = await supabase
    .from("students")
    .select("*")
    .eq("school_id", idNum)
    .single(); // Use .single() if you expect only one row to be returned

  if (error) {
    console.error("Error fetching student:", error);
    return null;
  }

  console.log("Fetched student:", data);
  return data;
}

export function getStudentBySchoolId(
  students: Student[],
  schoolId: string
): Student | undefined {
  const student = students.find((student) => student.school_id === schoolId);

  console.log("Student found:", student);
  return student;
}

export async function getAllStudents(): Promise<Student[]> {
  const { data, error } = await supabase.from("students").select("*");

  if (error) {
    console.error("Error fetching all students:", error);
  }

  console.log("All students", data);
  return data as Student[];
}

export async function addStudent(
  student: Omit<Student, "id" | "created_at">
): Promise<Student | null | "SCHOOL_ID_EXISTS"> {
  const { data, error } = await supabase
    .from("students")
    .insert(student)
    .single(); // Use .single() if you expect only one row to be inserted

  if (error?.code === "23505") {
    console.log("School ID already exists");
    return "SCHOOL_ID_EXISTS";
  }

  if (error) {
    console.error("Error adding student:", error);
    throw new Error();
  }

  console.log("Added student:", data);
  return data;
}

export async function updateStudent(
  student: Omit<Student, "created_at">
): Promise<unknown> {
  const { data, error } = await supabase
    .from("students")
    .update(student)
    .eq("id", student.id)
    .single();

  if (error) {
    console.error("Error updating student:", error);
  }

  console.log("Updated student:", data);
  return data as unknown;
}

export async function deactivateStudent(
  student: Student
): Promise<Student | null> {
  const { data, error } = await supabase
    .from("students")
    .update({ is_active: false })
    .eq("id", student.id)
    .single();

  if (error) {
    console.error("Error deactivating student:", error);
    return null;
  }

  console.log("Deactivated student:", data);
  return data as Student;
}
