import { Prisma, User } from '@prisma/client'

export interface IUserRepository {
  create: ({
    name,
    email,
    password_hash,
  }: Prisma.UserCreateInput) => Promise<User>
}
