import { Gym, Prisma } from '@prisma/client'

export interface IGymRepository {
  create: ({
    title,
    latitude,
    longitude,
    description,
    phone,
    created_at,
  }: Prisma.GymUncheckedCreateInput) => Promise<Gym>
  findById: (gymId: string) => Promise<Gym | null>
  findManyNearby: (latitude: number, longitude: number) => Promise<Gym[]>
  searchMany: (query: string, page: number) => Promise<Gym[]>
}
