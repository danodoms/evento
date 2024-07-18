import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export type User = {
  id: string;
  email: string;
  role: number;
  is_active: boolean;
  created_at: string;
};
