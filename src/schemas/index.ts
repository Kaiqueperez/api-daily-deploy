import { z } from "zod";

const createBlogSchema = z.object({
  title: z.string(),
  note: z.string(),
});
const idSchema = z.object({
  id: z.string(),
});

export { createBlogSchema, idSchema };
