import { GymRepository } from '@/repositories/GymRepository'
import { SearchGymsService } from '../SearchGymsService'

export function makeSearchGymsService() {
  const gymRepository = new GymRepository()

  const searchGymsService = new SearchGymsService(gymRepository)

  return searchGymsService
}
