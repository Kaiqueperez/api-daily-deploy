import { PrismaInstaceClient } from "./classes/prismaClient";
import { FastifyInstace } from "./classes/fastify";
import { BlogApi } from "./classes/Blog";
import { createBlogSchema, idSchema } from "./schemas";

const app = new FastifyInstace();
const fastifyInstance = app.createFastifyInstance();
const prisma = new PrismaInstaceClient();
const prismaInstance = prisma.createPrismaClient();

const Blog = new BlogApi(prismaInstance, fastifyInstance);
Blog.initializeListener();
Blog.getBlogsPosts();
Blog.createBlogPost(createBlogSchema);
Blog.updateBlogPost(createBlogSchema, idSchema);
Blog.deleteBlogPost(idSchema);
