import { FastifyInstance, fastify } from "fastify";

import {
  BLogActions,
  BlogPostIdSchema,
  BlogPostSchema,
} from "../../types/crudMethods";
import { PrismaClient } from "@prisma/client";

export class BlogApi implements BLogActions {
  prisma: PrismaClient;
  fastify: FastifyInstance;

  constructor(prismaInstace: PrismaClient, fastifyInstace: FastifyInstance) {
    this.prisma = prismaInstace;
    this.fastify = fastifyInstace;
  }

  initializeListener() {
    this.fastify.listen(
      {
        host: "0.0.0.0",
        port: process.env.PORT ? Number(process.env.PORT) : 3333,
      },
      () => {
        console.log("Server Running");
      }
    );
  }

  getBlogsPosts(): void {
    this.fastify.get("/", async (request, response) => {
      request.headers = {
        "access-control-allow-methods": "GET, POST, PUT, DELETE",
        "access-control-allow-origin": "*",
      };
      response.headers({
        "access-control-allow-methods": "GET, POST, PUT, DELETE",
        "access-control-allow-origin": "*",
      });

      return await this.prisma.blogNote.findMany();
    });
  }
  createBlogPost(createBlogPostSchema: BlogPostSchema): void {
    this.fastify.post("/blogs", {}, async (request, response) => {
      request.headers = {
        "access-control-allow-methods": "GET, POST, PUT, DELETE",
        "access-control-allow-origin": "*",
      };
      response.headers({
        "access-control-allow-methods": "GET, POST, PUT, DELETE",
        "access-control-allow-origin": "*",
      });
      const { title, note } = createBlogPostSchema.parse(request.body);

      try {
        await this.prisma.blogNote.create({
          data: {
            title,
            note,
          },
        });

        return response.code(201).send("blog created");
      } catch (error) {
        console.log(error);
      }
    });
  }
  updateBlogPost(
    updateBlogPostSchema: BlogPostSchema,
    idSchema: BlogPostIdSchema
  ): void {
    this.fastify.put("/edit/:id", async (request, response) => {
      request.headers = {
        "access-control-allow-methods": "GET, POST, PUT, DELETE",
        "access-control-allow-origin": "*",
      };
      response.headers({
        "access-control-allow-methods": "GET, POST, PUT, DELETE",
        "access-control-allow-origin": "*",
      });
      const { title, note } = updateBlogPostSchema.parse(request.body);

      const { id } = idSchema.parse(request.params);

      try {
        await this.prisma.blogNote.update({
          where: {
            id,
          },
          data: {
            title,
            note,
          },
        });
        return response.code(200).send(`title and note updated `);
      } catch (error) {}
    });
  }
  deleteBlogPost(idSchema: BlogPostIdSchema): void {
    this.fastify.delete("/blog/:id", async (request, response) => {
      request.headers = {
        "access-control-allow-methods": "GET, POST, PUT, DELETE",
        "access-control-allow-origin": "*",
      };
      response.headers({
        "access-control-allow-methods": "GET, POST, PUT, DELETE",
        "access-control-allow-origin": "*",
      });
      const { id } = idSchema.parse(request.params);
      try {
        await this.prisma.blogNote.delete({
          where: {
            id,
          },
        });

        response.code(200).send("selected blog has be deleted ");
      } catch (error) {
        response.send(error);
      }
    });
  }
}
