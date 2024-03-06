import { CheckInRepository } from '@/repositories/CheckInRepository'
import { GymRepository } from '@/repositories/GymRepository'
import { CheckInService } from '../CheckInService'

export function makeCheckInService() {
  const checkInRepository = new CheckInRepository()

  const gymRepository = new GymRepository()

  const checkInService = new CheckInService(checkInRepository, gymRepository)

  return checkInService
}
