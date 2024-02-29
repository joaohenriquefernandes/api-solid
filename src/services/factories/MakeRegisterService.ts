import { UserRepository } from '@/repositories/UserRepository'
import { RegisterService } from '../RegisterService'

export function makeRegisterService() {
  const usersRepository = new UserRepository()

  const registerService = new RegisterService(usersRepository)

  return registerService
}
