import { FastifyInstance } from "fastify";

export type FastifyInstanceApp = {
  createFastifyInstance(): FastifyInstance;
};
