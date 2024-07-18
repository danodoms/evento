import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export type User = {
  id?: string;
  email: string;
  role: number;
  is_active?: boolean;
  created_at?: string;
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

export async function addUser(
  user: Omit<User, "id" | "created_at">
): Promise<User> {
  const { data, error } = await supabase.from("users").insert(user).single(); // Use .single() if you expect only one row to be inserted

  if (error) {
    console.error("Error adding user:", error);
    throw new Error("Error adding user");
  }

  console.log("Added user:", data);
  return data;
}

export async function updateUser(
  user: Omit<User, "created_at">
): Promise<unknown> {
  const { data, error } = await supabase
    .from("users")
    .update(user)
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("Error updating user:", error);
    throw error;
  }

  console.log("Updated user:", data);
  return data as unknown;
}
