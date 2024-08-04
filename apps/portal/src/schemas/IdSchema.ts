import { z } from "zod";

export const IdSchema = z.object({
  school_id: z
    .string()
    .min(1, "School ID is required")
    .regex(/^\d{4}-\d{4}$/, "Incorrect school ID format, ex: 1234-5678"),
  name: z
    .string()
    .min(1, "Name is required")
    .regex(/^[a-zA-Z.\s]+$/, "Name can only contain letters, spaces, and dots"),
});
