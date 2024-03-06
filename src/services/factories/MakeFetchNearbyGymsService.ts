import { GymRepository } from '@/repositories/GymRepository'
import { FetchNearbyGymsService } from '../FetchNearbyGymsService'

export function makeFetchNearbyGymService() {
  const gymRepository = new GymRepository()

  const fetchNearbyGymsService = new FetchNearbyGymsService(gymRepository)

  return fetchNearbyGymsService
}
