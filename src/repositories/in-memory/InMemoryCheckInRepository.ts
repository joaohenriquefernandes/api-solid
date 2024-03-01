import { CheckIn, Prisma } from '@prisma/client'
import { ICheckInRepository } from '../interfaces/ICheckInRepository'
import { randomUUID } from 'node:crypto'

export class InMemoryCheckInRepository implements ICheckInRepository {
  public item: CheckIn[] = []
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

    this.item.push(checkIn)

    return checkIn
  }
}
