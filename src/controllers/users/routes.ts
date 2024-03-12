import { FastifyInstance } from 'fastify'
import { RegisterController } from './RegisterController'
import { AuthenticateController } from './AuthenticateController'
import { ProfileController } from './ProfileController'
import { verifyJWT } from '../../middlewares/VerifyJWT'
import { RefreshToken } from './RefreshController'

export async function usersRouter(app: FastifyInstance) {
  app.post('/register', RegisterController)
  app.post('/sessions', AuthenticateController)

  app.patch('/token/refresh', RefreshToken)

  app.get('/me', { onRequest: [verifyJWT] }, ProfileController)
}
