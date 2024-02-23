import { prisma } from '@/libs/prisma'
import { Prisma } from '@prisma/client'

export class UserRepository {
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
}
