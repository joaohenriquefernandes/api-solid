import { Gym, Prisma } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import { IGymRepository } from './interfaces/IGymRepository'
import { prisma } from '@/libs/prisma'

export class GymRepository implements IGymRepository {
  async create(data: Prisma.GymUncheckedCreateInput): Promise<Gym> {
    const gym = await prisma.gym.create({
      data,
    })

    return gym
  }

  async findById(gymId: string): Promise<Gym | null> {
    const gym = await prisma.gym.findUnique({
      where: {
        id: gymId,
      },
    })

    return gym
  }

  async findManyNearby(latitude: number, longitude: number): Promise<Gym[]> {
    const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT * from gyms
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `

    return gyms
  }

  async searchMany(query: string, page: number): Promise<Gym[]> {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return gyms
  }
}
