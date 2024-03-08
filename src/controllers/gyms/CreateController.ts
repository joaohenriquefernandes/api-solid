import { makeCreateGymService } from '@/services/factories/MakeCreateGymService'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function CreateController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createGymBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 100
    }),
    created_at: z.date(),
  })

  const { title, description, phone, latitude, longitude, created_at } =
    createGymBodySchema.parse(request.body)

  const createGymService = makeCreateGymService()

  const { gym } = await createGymService.execute({
    title,
    description,
    phone,
    latitude,
    longitude,
    created_at,
  })

  return reply.status(201).send({ gym })
}
