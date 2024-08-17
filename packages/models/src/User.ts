import { createClient } from "@repo/utils/supabase";

const supabase = createClient();

export type User = {
  id?: string;
  email: string;
  role: number;
  is_active?: boolean;
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

export type role = "ADMIN" | "OFFICER" | "REPRESENTATIVE";

export function convertRole(role: number): role {
  switch (role) {
    case 0:
      return "ADMIN";
    case 1:
      return "OFFICER";
    case 2:
      return "REPRESENTATIVE";
    default:
      return "REPRESENTATIVE";
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

export async function deactivateUser(user: User): Promise<User | null> {
  const { data, error } = await supabase
    .from("users")
    .update({ is_active: false })
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("Error deactivating user:", error);
    return null;
  }

  console.log("Deactivated user:", data);
  return data as User;
}

export async function toggleUserStatus(user: User): Promise<User | null> {
  const newStatus = !user.is_active;

  const { data, error } = await supabase
    .from("users")
    .update({ is_active: newStatus })
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("Error toggling user status:", error);
    return null;
  }

  console.log("Toggled user status:", data);
  return data as User;
}
