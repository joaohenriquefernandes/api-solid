import { InvalidCredentialsError } from '@/services/errors/InvalidCredentialsError'
import { makeAuthenticateService } from '@/services/factories/MakeAuthenticateService'
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
    const authenticateService = makeAuthenticateService()

    const { user } = await authenticateService.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      },
    )

    return reply.status(200).send({ token })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send()
    }
  }
}
