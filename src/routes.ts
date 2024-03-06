import { FastifyInstance } from 'fastify'
import { RegisterController } from './controllers/RegisterController'
import { AuthenticateController } from './controllers/AuthenticateController'
import { ProfileController } from './controllers/ProfileController'
import { verifyJWT } from './middlewares/VerifyJWT'

export async function appRouter(app: FastifyInstance) {
  app.post('/register', RegisterController)
  app.post('/sessions', AuthenticateController)

  app.get('/me', { onRequest: [verifyJWT] }, ProfileController)
}
