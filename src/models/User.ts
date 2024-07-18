import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export type User = {
  id: string;
  email: string;
  role: number;
  is_active: boolean;
  created_at: string;
};

export async function getAllUsers(): Promise<User[]> {
  const { data, error } = await supabase.from("users").select("*");

  if (error) {
    console.error("Error fetching all users:", error);
  }

  console.log("All users", data);
  return data as User[];
}

export function convertRole(role: number): string {
  switch (role) {
    case 0:
      return "Admin";
    case 1:
      return "Officer";
    case 2:
      return "Representative";
    default:
      return "undefined";
  }
}
