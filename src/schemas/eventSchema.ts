import { z } from "zod";

export const eventSchema = z.object({
  id: z.bigint(),
  created_at: z.string(), // Assuming ISO 8601 date string
  is_active: z.boolean(),
  name: z
    .string()
    .min(1, "Name is required")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  description: z.string().optional(),
  date: z.date(), // Assuming ISO 8601 date string
  location: z.string().optional(),
  duration: z.enum(["AM_ONLY", "PM_ONLY", "AM_AND_PM"]), // enum for duration
});
