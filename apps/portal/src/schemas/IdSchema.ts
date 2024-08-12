import { z } from "zod";

export const IdSchema = z.object({
  school_id: z
    .string()
    .min(1, "ID Number is required")
    .regex(/^\d{4}-\d{4}$/, "Incorrect ID Number format, ex: 1234-5678"),
  firstName: z
    .string()
    .min(1, "First name is required")
    .regex(
      /^[a-zA-Z.\s]+$/,
      "First name can only contain letters, spaces, and dots"
    ),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .regex(
      /^[a-zA-Z.\s]+$/,
      "Last name can only contain letters, spaces, and dots"
    ),
});
