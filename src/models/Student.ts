import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export interface Student {
  id: number;
  createdAt: string;
  idNum: string;
  name: string;
  deptId: number;
}

export async function getStudentByIdNum(idNum: string) {
  const { data, error } = await supabase
    .from("students")
    .select("*")
    .eq("id_num", idNum)
    .single(); // Use .single() if you expect only one row to be returned

  if (error) {
    console.error("Error fetching student:", error);
    return null;
  }

  return data;
}

export async function getAllStudents() {
  const { data: students, error } = await supabase.from("students").select("*");

  console.log("All studentts", students);
}
