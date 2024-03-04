import { IGymRepository } from '@/repositories/interfaces/IGymRepository'
import { Gym } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import { randomUUID } from 'node:crypto'

interface ICreateGymServiceRequest {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
  created_at: Date
}

interface ICreateGymServiceResponse {
  gym: Gym
}

export class CreateGymService {
  constructor(private gymRepository: IGymRepository) {}

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: ICreateGymServiceRequest): Promise<ICreateGymServiceResponse> {
    const gym = await this.gymRepository.create({
      id: randomUUID(),
      title,
      description,
      phone,
      latitude: new Decimal(String(latitude)),
      longitude: new Decimal(String(longitude)),
      created_at: new Date(),
    })

    return { gym }
  }
}
