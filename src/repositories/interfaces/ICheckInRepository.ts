import { CheckIn, Prisma } from '@prisma/client'

export interface ICheckInRepository {
  create: ({
    user_id,
    gym_id,
  }: Prisma.CheckInUncheckedCreateInput) => Promise<CheckIn>
}
