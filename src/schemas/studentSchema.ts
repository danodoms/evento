import { z } from "zod";

export const studentSchema = z.object({
  school_id: z
    .string()
    .min(1, "School ID is required")
    .regex(/^[0-9-]+$/, "School ID can only contain numbers and hyphens"),
  name: z
    .string()
    .min(1, "Name is required")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  dept_id: z.string().optional(),
});
