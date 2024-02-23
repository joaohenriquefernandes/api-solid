import { FastifyInstance } from 'fastify'
import { RegisterController } from './controllers/RegisterController'

export async function appRouter(app: FastifyInstance) {
  app.post('/users', RegisterController)
}
