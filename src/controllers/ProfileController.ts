import { FastifyReply, FastifyRequest } from 'fastify'

export async function ProfileController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    await request.jwtVerify()

    console.log(request.user)

    return reply.status(200).send()
  } catch (error) {
    return reply.status(400).send()
  }
}
