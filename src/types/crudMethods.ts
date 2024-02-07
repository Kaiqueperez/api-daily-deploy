import { z } from "zod";

export type BlogPostSchema = z.ZodObject<
  {
    title: z.ZodString;
    note: z.ZodString;
  },
  "strip",
  z.ZodTypeAny,
  {
    title: string;
    note: string;
  },
  {
    title: string;
    note: string;
  }
>;

export type BlogPostIdSchema = z.ZodObject<
  {
    id: z.ZodString;
  },
  "strip",
  z.ZodTypeAny,
  {
    id: string;
  },
  {
    id: string;
  }
>;
export type BLogActions = {
  getBlogsPosts(): void;
  createBlogPost(createBlogPostSchema: BlogPostSchema): void;
  updateBlogPost(
    updateBlogPostSchema: BlogPostSchema,
    idSchema: BlogPostIdSchema
  ): void;
  deleteBlogPost(idSchema: BlogPostIdSchema): void;
};
