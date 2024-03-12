import { UserAlreadyExistsError } from '@/services/errors/UserAlreadyExistsError'
import { makeRegisterService } from '@/services/factories/MakeRegisterService'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function RegisterController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(['ADMIN', 'MEMBER']).optional(),
  })

  const { name, email, password, role } = registerBodySchema.parse(request.body)

  try {
    const registerService = makeRegisterService()

    const { user } = await registerService.execute({
      name,
      email,
      password,
      role,
    })

    return reply.status(201).send({ user })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }
  }
}
