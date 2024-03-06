import { GymRepository } from '@/repositories/GymRepository'
import { CreateGymService } from '../CreateGymService'

export function makeCreateGymService() {
  const gymRepository = new GymRepository()

  const createGymService = new CreateGymService(gymRepository)

  return createGymService
}
