import { ResourceNotFoundError } from '@/services/errors/ResourceNotFoundError'
import { makeCheckInService } from '@/services/factories/MakeCheckInService'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function CreateController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createCheckInBodySchema = z.object({
    userId: z.string(),
    gymId: z.string(),
    userLatitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    userLongitude: z.number().refine((value) => {
      return Math.abs(value) <= 100
    }),
  })

  const { gymId, userId, userLatitude, userLongitude } =
    createCheckInBodySchema.parse(request.body)

  try {
    const checkInService = makeCheckInService()

    const { checkIn } = await checkInService.execute({
      gymId,
      userId,
      userLatitude,
      userLongitude,
    })

    return reply.status(201).send({ checkIn })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send()
    }
  }
}
