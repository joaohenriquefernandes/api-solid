import { prisma } from '@/libs/prisma'
import { Prisma } from '@prisma/client'
import { IUserRepository } from './interfaces/IUserRepository'

export class UserRepository implements IUserRepository {
  async create({ name, email, password_hash }: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password_hash,
      },
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }
}
