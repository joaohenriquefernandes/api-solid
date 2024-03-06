import { CheckInRepository } from '@/repositories/CheckInRepository'
import { GetUserMetricsService } from '../GetUserMetricsService'

export function makeGetUserMetricsService() {
  const checkInRepository = new CheckInRepository()

  const getUserMetricsService = new GetUserMetricsService(checkInRepository)

  return getUserMetricsService
}
