import { verifyJWT } from '@/middlewares/VerifyJWT'
import { FastifyInstance } from 'fastify'
import { SearchController } from './SearchController'
import { NearbyController } from './NearbyController'
import { CreateController } from './CreateController'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/gyms', CreateController)
  app.get('/gyms/search', SearchController)
  app.get('/gyms/nearby', NearbyController)
}
