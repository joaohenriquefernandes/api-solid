import { Gym, Prisma } from '@prisma/client'
import { IGymRepository } from '../interfaces/IGymRepository'
import { randomUUID } from 'node:crypto'
import { Decimal } from '@prisma/client/runtime/library'

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
}
