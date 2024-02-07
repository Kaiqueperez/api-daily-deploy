import { z } from "zod";
import { PrismaInstaceClient } from "./classes/prismaClient";
import { FastifyInstace } from "./classes/fastify";
import { BlogApi } from "./classes/Blog";

const app = new FastifyInstace();

const fastifyInstance = app.createFastifyInstance();

const prisma = new PrismaInstaceClient();
const prismaInstance = prisma.createPrismaClient();

const createBlogSchema = z.object({
  title: z.string(),
  note: z.string(),
});

const idSchema = z.object({
  id: z.string(),
});

const Blog = new BlogApi(prismaInstance, fastifyInstance);
Blog.initializeListener();
Blog.getBlogsPosts();
Blog.createBlogPost(createBlogSchema);
Blog.updateBlogPost(createBlogSchema, idSchema);
Blog.deleteBlogPost(idSchema);
