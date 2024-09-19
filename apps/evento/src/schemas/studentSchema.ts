import { z } from "zod";

export const studentSchema = z.object({
  school_id: z
    .string()
    .min(1, "School ID is required")
    .regex(/^\d{4}-\d{4}$/, "Incorrect school ID format, ex: 1234-5678"),
  first_name: z
    .string()
    .min(1, "First name is required")
    .regex(
      /^[a-zA-ZñÑ\s]+$/,
      "First name can only contain letters, and spaces"
    ),
  last_name: z
    .string()
    .min(1, "Last name is required")
    .regex(/^[a-zA-ZñÑ\s]+$/, "Last name can only contain letters, and spaces"),
  dept_id: z.string().optional(),
});
