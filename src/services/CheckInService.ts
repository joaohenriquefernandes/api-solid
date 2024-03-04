import { ICheckInRepository } from '@/repositories/interfaces/ICheckInRepository'
import { CheckIn } from '@prisma/client'

interface ICheckInServiceRequest {
  userId: string
  gymId: string
}

interface ICheckInServiceResponse {
  checkIn: CheckIn
}

export class CheckInService {
  constructor(private checkInRepository: ICheckInRepository) {}

  async execute({
    userId,
    gymId,
  }: ICheckInServiceRequest): Promise<ICheckInServiceResponse> {
    const checkInOnSameDay = await this.checkInRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )

    if (checkInOnSameDay) {
      throw new Error()
    }

    const checkIn = await this.checkInRepository.create({
      user_id: userId,
      gym_id: gymId,
    })

    return { checkIn }
  }
}
