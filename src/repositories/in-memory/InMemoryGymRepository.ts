import { Gym, Prisma } from '@prisma/client'
import { IGymRepository } from '../interfaces/IGymRepository'
import { randomUUID } from 'node:crypto'
import { Decimal } from '@prisma/client/runtime/library'
import { getDistanceBetweenCoordinate } from '@/utils/getDistanceBetweenCoordinates'

export class InMemoryGymRepository implements IGymRepository {
  public items: Gym[] = []

  async create({
    id,
    title,
    description,
    latitude,
    longitude,
    phone,
  }: Prisma.GymUncheckedCreateInput): Promise<Gym> {
    const gym: Gym = {
      id: id ?? randomUUID(),
      title,
      description: description ?? null,
      phone: phone ?? null,
      latitude: new Decimal(String(latitude)),
      longitude: new Decimal(String(longitude)),
      created_at: new Date(),
    }

    this.items.push(gym)

    return gym
  }

  async findById(gymId: string): Promise<Gym | null> {
    const gym = this.items.find((item) => item.id === gymId)

    if (!gym) {
      return null
    }

    return gym
  }

  async findManyNearby(latitude: number, longitude: number): Promise<Gym[]> {
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinate(
        {
          latitude,
          longitude,
        },
        {
          latitude: item.latitude.toNumber(),
          longitude: item.longitude.toNumber(),
        },
      )

      const MAX_DISTANCE_IN_KILOMETERS = 10

      return distance < MAX_DISTANCE_IN_KILOMETERS
    })
  }

  async searchMany(query: string, page: number): Promise<Gym[]> {
    return this.items
      .filter((item) => item.title.includes(query))
      .slice((page - 1) * 20, page * 20)
  }
}
