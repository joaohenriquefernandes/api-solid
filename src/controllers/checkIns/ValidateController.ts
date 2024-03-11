import { ResourceNotFoundError } from '@/services/errors/ResourceNotFoundError'
import { makeValidateCheckInService } from '@/services/factories/MakeValidateCheckInService'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function ValidateController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const checkInValidateParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = checkInValidateParamsSchema.parse(request.params)

  try {
    const validateCheckInService = makeValidateCheckInService()

    const { checkIn } = await validateCheckInService.execute({ checkInId })

    return reply.status(200).send({ checkIn })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send()
    }

    return reply.status(400).send()
  }
}
