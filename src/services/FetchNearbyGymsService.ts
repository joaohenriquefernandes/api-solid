import { IGymRepository } from '@/repositories/interfaces/IGymRepository'
import { Gym } from '@prisma/client'

interface IFetchNearbyGymsServiceRequest {
  userLatitude: number
  userLongitude: number
}

interface IFetchNearbyGymsServiceResponse {
  gyms: Gym[]
}

export class FetchNearbyGymsService {
  constructor(private gymRepository: IGymRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: IFetchNearbyGymsServiceRequest): Promise<IFetchNearbyGymsServiceResponse> {
    const gyms = await this.gymRepository.findManyNearby(
      userLatitude,
      userLongitude,
    )

    return { gyms }
  }
}
