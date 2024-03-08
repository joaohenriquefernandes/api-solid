import { makeSearchGymsService } from '@/services/factories/MakeSearchGymsService'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function SearchController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchGymsQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number(),
  })

  const { query, page } = searchGymsQuerySchema.parse(request.query)

  const searchGymsService = makeSearchGymsService()

  const { gyms } = await searchGymsService.execute({
    query,
    page,
  })

  return reply.status(200).send({
    gyms,
  })
}
