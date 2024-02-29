import { UserRepository } from '@/repositories/UserRepository'
import { AuthenticateService } from '@/services/AuthenticateService'
import { InvalidCredentialsError } from '@/services/errors/InvalidCredentialsError'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function AuthenticateController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const usersRepository = new UserRepository()

    const authenticateService = new AuthenticateService(usersRepository)

    await authenticateService.execute({
      email,
      password,
    })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send()
    }
  }

  return reply.status(204).send()
}
