import { ICheckInRepository } from '@/repositories/interfaces/ICheckInRepository'
import { IGymRepository } from '@/repositories/interfaces/IGymRepository'
import { CheckIn } from '@prisma/client'
import { ResourceNotFoundError } from './errors/ResourceNotFoundError'
import { getDistanceBetweenCoordinate } from '@/utils/getDistanceBetweenCoordinates'
import { MaxDistanceError } from './errors/MaxDistanceError'
import { MaxNumberOfCheckInsError } from './errors/MaxNumberOfCheckInsError'

interface ICheckInServiceRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

interface ICheckInServiceResponse {
  checkIn: CheckIn
}

export class CheckInService {
  constructor(
    private checkInRepository: ICheckInRepository,
    private gymRepository: IGymRepository,
  ) {}

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: ICheckInServiceRequest): Promise<ICheckInServiceResponse> {
    const gym = await this.gymRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    const distance = getDistanceBetweenCoordinate(
      {
        latitude: userLatitude,
        longitude: userLongitude,
      },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    )

    const MAX_DISTANCE_IN_KILOMETERS = 0.1

    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new MaxDistanceError()
    }

    const checkInOnSameDay = await this.checkInRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )

    if (checkInOnSameDay) {
      throw new MaxNumberOfCheckInsError()
    }

    const checkIn = await this.checkInRepository.create({
      user_id: userId,
      gym_id: gymId,
    })

    return { checkIn }
  }
}
