import { CheckInRepository } from '@/repositories/CheckInRepository'
import { FetchUserCheckInsHistoryService } from '../FetchUserCheckInsHistoryService'

export function makeFetchUserCheckInHistoryService() {
  const checkInRepository = new CheckInRepository()

  const fetchUserCheckInsHistoryService = new FetchUserCheckInsHistoryService(
    checkInRepository,
  )

  return fetchUserCheckInsHistoryService
}
