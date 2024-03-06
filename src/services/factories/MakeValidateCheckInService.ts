import { CheckInRepository } from '@/repositories/CheckInRepository'
import { ValidateCheckInService } from '../ValidateCheckInService'

export function makeValidateCheckInService() {
  const checkInRepository = new CheckInRepository()

  const validateCheckInService = new ValidateCheckInService(checkInRepository)

  return validateCheckInService
}
