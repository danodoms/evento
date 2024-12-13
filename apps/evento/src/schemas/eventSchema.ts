import { z } from "zod";

export const eventSchema = z.object({
  id: z.bigint().optional(), // Make optional
  created_at: z.string().optional(), // Make optional
  is_active: z.boolean().default(true), // Set a default value
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  date: z.date(), // Assuming ISO 8601 date string
  location: z.string().optional(),
  duration: z.enum(["AM_ONLY", "PM_ONLY", "AM_AND_PM"]), // enum for duration
  duration_in_minutes: z.number(),
  is_required: z.boolean().default(true),
  is_check_in_only: z.boolean().default(false),
});
