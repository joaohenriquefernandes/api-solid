import { CheckIn, Prisma } from '@prisma/client'
import { ICheckInRepository } from '../interfaces/ICheckInRepository'
import { randomUUID } from 'node:crypto'
import dayjs from 'dayjs'

export class InMemoryCheckInRepository implements ICheckInRepository {
  public items: CheckIn[] = []

  async countByUserId(userId: string): Promise<number> {
    return this.items.filter((checkIn) => checkIn.user_id === userId).length
  }

  async findById(id: string): Promise<CheckIn | null> {
    const checkIn = this.items.find((checkIn) => checkIn.id === id)

    if (!checkIn) {
      return null
    }

    return checkIn
  }

  async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
    const checkIns = this.items
      .filter((checkIn) => checkIn.user_id === userId)
      .slice((page - 1) * 20, page * 20)

    return checkIns
  }

  async create({
    user_id,
    gym_id,
    validated_at,
  }: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn: CheckIn = {
      id: randomUUID(),
      created_at: new Date(),
      validated_at: validated_at ? new Date(validated_at) : null,
      gym_id,
      user_id,
    }

    this.items.push(checkIn)

    return checkIn
  }

  async save(checkIn: CheckIn): Promise<CheckIn> {
    const checkInIndex = this.items.findIndex((item) => item.id === checkIn.id)

    if (checkInIndex >= 0) {
      this.items[checkInIndex] = checkIn
    }

    return checkIn
  }

  async findByUserIdOnDate(
    userId: string,
    date: Date,
  ): Promise<CheckIn | null> {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkInOnSameDate = this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at)

      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

      return checkIn.user_id === userId && isOnSameDate
    })

    if (!checkInOnSameDate) {
      return null
    }

    return checkInOnSameDate
  }
}
