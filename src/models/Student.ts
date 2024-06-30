import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export interface Student {
  id: number;
  created_at: string;
  school_id: string;
  name: string;
  dept_id: number;
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

export async function getAllStudents() {
  const { data: students, error } = await supabase.from("students").select("*");

  console.log("All studentts", students);
}
