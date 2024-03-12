import { verifyJWT } from '@/middlewares/VerifyJWT'
import { FastifyInstance } from 'fastify'
import { ValidateController } from './ValidateController'
import { CreateController } from './CreateController'
import { HistoryController } from './HistoryController'
import { MetricsController } from './MetricsController'
import { verifyUserRole } from '@/middlewares/verifyUserRole'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/gyms/:gymId/check-ins', CreateController)
  app.patch(
    '/check-ins/:checkInId/validate',
    { onRequest: [verifyUserRole('ADMIN')] },
    ValidateController,
  )

  app.get('/check-ins/history', HistoryController)
  app.get('/check-ins/metrics', MetricsController)
}
