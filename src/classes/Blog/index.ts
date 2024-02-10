import { FastifyInstance } from "fastify";
import { fastifyCors } from "@fastify/cors";
import { PrismaClient } from "@prisma/client";
import { createBlogSchema, idSchema } from "../../schemas";

export class BlogApi {
  prisma: PrismaClient;
  fastify: FastifyInstance;

  constructor(prismaInstace: PrismaClient, fastifyInstace: FastifyInstance) {
    this.prisma = prismaInstace;
    this.fastify = fastifyInstace;

    this.fastify.register(fastifyCors, {
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
    });
    this.setupRoutes();
  }

  private setupRoutes() {
    this.getBlogsPosts();
    this.createBlogPost();
    this.updateBlogPost();
    this.deleteBlogPost();
  }

  private getBlogsPosts(): void {
    this.fastify.get("/", async () => {
      return await this.prisma.blogNote.findMany();
    });
  }
  private createBlogPost(): void {
    this.fastify.post("/blogs", {}, async (request, response) => {
      const { title, note } = createBlogSchema.parse(request.body);

      if (title.trim() === "" || note.trim() === "") {
        return response.code(400).send({
          code: response.statusCode,
          body: request.body,
          message: "Os campos title e note não podem ser enviados vazio",
        });
      }
      try {
        await this.prisma.blogNote.create({
          data: {
            title,
            note,
          },
        });

        return response.code(201).send(`your blog ${title} is created`);
      } catch (error) {
        console.log(error);
      }
    });
  }
  private updateBlogPost(): void {
    this.fastify.put("/post/:id", async (request, response) => {
      const { title, note } = createBlogSchema.parse(request.body);

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
  private deleteBlogPost(): void {
    this.fastify.delete("/blog/:id", async (request, response) => {
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
}
