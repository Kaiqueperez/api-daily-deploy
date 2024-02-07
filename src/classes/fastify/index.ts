import fastify, { FastifyInstance } from "fastify";

import { FastifyInstanceApp } from "../../types/fastifyInstance";

export class FastifyInstace implements FastifyInstanceApp {
  createFastifyInstance(): FastifyInstance {
    return fastify();
  }
}
