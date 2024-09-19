import { createClient } from "@repo/utils/supabase";

const supabase = createClient();

export type Student = {
  id: number;
  school_id: string;
  first_name: string;
  last_name: string;
  dept_id: number | null;
  is_active: boolean | undefined;
  created_at: string | null;
};

export function getStudentFullName(student: Student): string {
  return `${student.first_name} ${student.last_name}`;
}

export async function getStudentBySchoolId(schoolId: string) {
  const { data, error } = await supabase
    .from("students")
    .select("*")
    .eq("school_id", schoolId)
    .maybeSingle();

  if (error) {
    console.error("Error fetching student:", error);
    return null;
  }

  console.log("Fetched student:", data);
  return data;
}

//! V1 DEPRECATED this function does not directly query  the database, instead it uses the students data from the cache which fetches all students at once
// export function getStudentBySchoolId(
//   students: Student[],
//   schoolId: string
// ): Student | undefined {
//   const student = students.find((student) => student.school_id === schoolId);

//   console.log("Student found:", student);
//   return student;
// }

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
): Promise<Student | "SCHOOL_ID_EXISTS" | null> {
  const { data, error } = await supabase
    .from("students")
    .insert(student)
    .select()
    .maybeSingle();

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
): Promise<Student> {
  const { data, error } = await supabase
    .from("students")
    .update(student)
    .eq("id", student.id)
    .select()
    .maybeSingle();

  if (error) {
    console.error("Error updating student:", error);
    throw error;
  }

  console.log("Updated student:", data);
  return data as Student;
}

export async function updateStudentBySchoolId(
  schoolId: string,
  updates: Partial<Omit<Student, "school_id">>
): Promise<Student | null> {
  const { data, error } = await supabase
    .from("students")
    .update(updates)
    .eq("school_id", schoolId)
    .select()
    .maybeSingle();

  if (error) {
    console.error("Error updating student:", error);
    return null; // Return null or handle the error appropriately
  }

  console.log("Updated student:", data);
  return data; // Return the updated data
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

export async function getFilteredPaginatedStudents(
  currentPage: number,
  query: string,
  deptId: number | null,
  status: boolean,
  limit: number = 9
): Promise<{ students: Student[]; count: number | null }> {
  let queryBuilder = supabase
    .from("students")
    .select("*", { count: "exact" })
    .eq("is_active", status)
    .or(
      `first_name.ilike.%${query}%,last_name.ilike.%${query}%,school_id.ilike.%${query}%`
    )
    .range((currentPage - 1) * limit, currentPage * limit - 1); // Adjust range to be inclusive of the last item

  if (deptId) {
    queryBuilder = queryBuilder.eq("dept_id", deptId);
  }

  const { data, count, error } = await queryBuilder;

  if (error) {
    console.error("Error fetching filtered students:", error);
    throw error;
  }

  // return data as Student[];
  return { students: data as Student[], count };
}

export const getStudentRowCount = async () => {
  const { count, error } = await supabase
    .from("students")
    .select("id", { count: "exact", head: true });

  if (error) {
    console.error("Error fetching total student row count:", error);
    return 0;
  }

  console.log("Total student row count:", count);

  return count || 0;
};

export const isValidSchoolId = (id: string): boolean => {
  // Regular expression to match the format "YYYY-NNNN"
  const schoolIdRegex = /^\d{4}-\d{4}$/;

  // Test the string against the regular expression
  return schoolIdRegex.test(id);
};
