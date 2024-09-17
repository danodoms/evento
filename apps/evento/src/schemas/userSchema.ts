import { z } from "zod";

export const userSchema = z.object({
  id: z.bigint().optional(), // Make optional
  created_at: z.string().optional(), // Make optional
  is_active: z.boolean().default(true), // Set a default value
  email: z.string().email(),
  name: z.string().max(100),
  role: z.string().max(1),
});
