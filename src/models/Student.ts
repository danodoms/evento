import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export interface Student {
  id: number;
  created_at: string;
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

export async function getAllStudents(): Promise<Student[]> {
  const { data: students, error } = await supabase.from("students").select("*");

  if (error) {
    console.error("Error fetching all students:", error);
  }

  console.log("All studentts", students);
  return students as Student[];
}

export async function addStudent(
  student: Omit<Student, "id" | "created_at">
): Promise<Student | null | "SCHOOL_ID_EXISTS"> {
  //check if school id already exists
  const schoolIdExists = await schoolIdAlreadyExists(student.school_id);
  if (schoolIdExists) {
    console.error("School ID already exists");
    return "SCHOOL_ID_EXISTS";
  }

  const { data, error } = await supabase
    .from("students")
    .insert(student)
    .single(); // Use .single() if you expect only one row to be inserted

  if (error) {
    console.error("Error adding student:", error);
    return null;
  }

  console.log("Added student:", data);
  return data;
}

export async function schoolIdAlreadyExists(
  schoolId: string
): Promise<boolean | null> {
  const { data, error } = await supabase
    .from("students")
    .select("*")
    .eq("school_id", schoolId)
    .single();

  if (error) {
    console.error("Error fetching school id", error);
    return null;
  }

  return data ? true : false;
}
