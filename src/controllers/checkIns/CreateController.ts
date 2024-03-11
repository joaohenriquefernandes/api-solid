import { MaxDistanceError } from '@/services/errors/MaxDistanceError'
import { MaxNumberOfCheckInsError } from '@/services/errors/MaxNumberOfCheckInsError'
import { ResourceNotFoundError } from '@/services/errors/ResourceNotFoundError'
import { makeCheckInService } from '@/services/factories/MakeCheckInService'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function CreateController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid(),
  })

  const createCheckInBodySchema = z.object({
    userLatitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    userLongitude: z.number().refine((value) => {
      return Math.abs(value) <= 100
    }),
  })

  const { gymId } = createCheckInParamsSchema.parse(request.params)

  const { userLatitude, userLongitude } = createCheckInBodySchema.parse(
    request.body,
  )

  try {
    const checkInService = makeCheckInService()

    const { checkIn } = await checkInService.execute({
      gymId,
      userId: request.user.sub,
      userLatitude,
      userLongitude,
    })

    return reply.status(201).send({ checkIn })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send()
    }

    if (
      error instanceof MaxDistanceError ||
      error instanceof MaxNumberOfCheckInsError
    ) {
      return reply.status(400).send()
    }
  }
}
