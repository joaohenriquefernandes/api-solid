import { makeFetchUserCheckInHistoryService } from '@/services/factories/MakeFetchUserCheckInsHistoryService'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function HistoryController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number(),
  })

  const { page } = checkInHistoryQuerySchema.parse(request.query)

  const fetchUserCheckInsHistoryService = makeFetchUserCheckInHistoryService()

  const { checkIns } = await fetchUserCheckInsHistoryService.execute({
    page,
    userId: request.user.sub,
  })

  return reply.status(200).send({ checkIns })
}
