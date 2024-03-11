import { makeGetUserMetricsService } from '@/services/factories/MakeGetUserMetricsService'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function MetricsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getUserMetricsService = makeGetUserMetricsService()

  const { checkInsCount } = await getUserMetricsService.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({ checkInsCount })
}
