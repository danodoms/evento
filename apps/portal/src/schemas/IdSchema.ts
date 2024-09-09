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
  // profilePhoto: z
  //   .string()
  //   .min(1, "Photo is required")
  //   .refine((data) => {
  //     try {
  //       const [, , encodedData] = data.split(",");
  //       if (!encodedData) return false;
  //       const binaryData = atob(encodedData);
  //       const arrayBuffer = new ArrayBuffer(binaryData.length);
  //       const uint8Array = new Uint8Array(arrayBuffer);

  //       for (let i = 0; i < binaryData.length; i++) {
  //         uint8Array[i] = binaryData.charCodeAt(i);
  //       }

  //       const blob = new Blob([uint8Array], { type: "image/*" });
  //       return blob.size > 0;
  //     } catch {
  //       return false;
  //     }
  //   }, "Invalid image data"),
});

// profilePhoto: z
// .instanceof(File)
// .refine((file) => file.size <= 5000000, `Max file size is 5MB.`)
// .refine(
//   (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
//   "Only .jpg, .png and .webp formats are supported."
// ),
