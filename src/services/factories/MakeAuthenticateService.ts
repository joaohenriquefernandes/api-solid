import { UserRepository } from '@/repositories/UserRepository'
import { AuthenticateService } from '../AuthenticateService'

export function makeAuthenticateService() {
  const usersRepository = new UserRepository()

  const authenticateService = new AuthenticateService(usersRepository)

  return authenticateService
}
