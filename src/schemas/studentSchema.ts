import { z } from "zod";

export const studentSchema = z.object({
  school_id: z.string(),
  name: z.string(),
  dept_id: z.string(),
});
