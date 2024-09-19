import { z } from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const ACCEPTED_IMAGE_TYPES = ["jpeg", "jpg", "png", "webp"];

export const IdSchema = z.object({
  school_id: z
    .string()
    .min(1, "ID Number is required")
    .regex(/^\d{4}-\d{4}$/, "Incorrect ID Number format, ex: 1234-5678"),
  firstName: z
    .string()
    .min(1, "First name is required")
    .regex(
      /^[a-zA-ZñÑ\s]+$/, // Updated regex to disallow dots
      "First name can only contain letters and spaces"
    ),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .regex(
      /^[a-zA-ZñÑ\s]+$/, // Updated regex to disallow dots
      "Last name can only contain letters and spaces"
    ),

  department: z.string().length(1, "Department can't be empty"),

  // photo: z
  //   .any()
  //   .refine((files) => {
  //     return files?.[0]?.size <= MAX_FILE_SIZE;
  //   }, `Max image size is 5MB.`)
  //   .refine(
  //     (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
  //     "Only .jpg, .jpeg, .png and .webp formats are supported."
  //   ),

  photo: z
    .any()
    .refine((files) => files?.length > 0, "Missing profile photo") // Check if file is present
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      "Max image size is 5MB."
    ) // Check file size
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported." // Check file type
    ),
});
