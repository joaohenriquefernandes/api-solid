import { makeGetUserProfileService } from '@/services/factories/MakeGetUserProfileService'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function ProfileController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const userId = request.user.sub

    const getUserProfile = makeGetUserProfileService()

    const { user } = await getUserProfile.execute({ userId })

    return reply.status(200).send({ user })
  } catch (error) {
    return reply.status(400).send()
  }
}
