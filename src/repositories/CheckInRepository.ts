import { CheckIn, Prisma } from '@prisma/client'
import { ICheckInRepository } from './interfaces/ICheckInRepository'
import { prisma } from '@/libs/prisma'

export class CheckInRepository implements ICheckInRepository {
  async create({ user_id, gym_id }: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data: {
        user_id,
        gym_id,
      },
    })

    return checkIn
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        created_at: date,
        user_id: userId,
      },
    })
  }
}
