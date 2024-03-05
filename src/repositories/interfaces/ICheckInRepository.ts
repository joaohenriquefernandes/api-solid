import { CheckIn, Prisma } from '@prisma/client'

export interface ICheckInRepository {
  create: ({
    user_id,
    gym_id,
  }: Prisma.CheckInUncheckedCreateInput) => Promise<CheckIn>
  save: (checkIn: CheckIn) => Promise<CheckIn>
  findById: (id: string) => Promise<CheckIn | null>
  findByUserIdOnDate: (userId: string, date: Date) => Promise<CheckIn | null>
  findManyByUserId: (userId: string, page: number) => Promise<CheckIn[]>
  countByUserId: (userId: string) => Promise<number>
}
