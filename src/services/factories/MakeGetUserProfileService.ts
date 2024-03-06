import { UserRepository } from '@/repositories/UserRepository'
import { GetUserProfileService } from '../GetUserProfileService'

export function makeGetUserProfileService() {
  const userRepository = new UserRepository()

  const getUserProfileService = new GetUserProfileService(userRepository)

  return getUserProfileService
}
