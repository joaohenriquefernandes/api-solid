import { ICheckInRepository } from '@/repositories/interfaces/ICheckInRepository'
import { CheckIn } from '@prisma/client'

interface IFetchUserCheckInsHistoryServiceRequest {
  userId: string
  page: number
}

interface IFetchUserCheckInsHistoryServiceResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryService {
  constructor(private checkInRepository: ICheckInRepository) {}

  async execute({
    userId,
    page,
  }: IFetchUserCheckInsHistoryServiceRequest): Promise<IFetchUserCheckInsHistoryServiceResponse> {
    const checkIns = await this.checkInRepository.findManyByUserId(userId, page)

    return { checkIns }
  }
}
