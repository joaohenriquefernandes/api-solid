import { UserRepository } from '@/repositories/UserRepository'
import { RegisterService } from '@/services/RegisterService'
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
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const userRepository = new UserRepository()

    const registerService = new RegisterService(userRepository)

    const user = await registerService.execute({
      name,
      email,
      password,
    })

    return reply.status(201).send({ user })
  } catch (error) {
    return reply.status(404).send({ message: 'Email already exists' })
  }
}
