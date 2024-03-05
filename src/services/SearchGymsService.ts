import { IGymRepository } from '@/repositories/interfaces/IGymRepository'
import { Gym } from '@prisma/client'

interface ISearchGymsServiceRequest {
  query: string
  page: number
}

interface ISearchGymsServiceResponse {
  gyms: Gym[]
}

export class SearchGymsService {
  constructor(private gymRepository: IGymRepository) {}

  async execute({
    query,
    page,
  }: ISearchGymsServiceRequest): Promise<ISearchGymsServiceResponse> {
    const gyms = await this.gymRepository.searchMany(query, page)

    return { gyms }
  }
}
