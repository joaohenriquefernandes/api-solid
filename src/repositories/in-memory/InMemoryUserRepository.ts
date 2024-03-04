import { Prisma, User } from '@prisma/client'
import { IUserRepository } from '../interfaces/IUserRepository'
import { randomUUID } from 'node:crypto'

export class InMemoryUserRepository implements IUserRepository {
  public items: User[] = []

  async create({ name, email, password_hash }: Prisma.UserCreateInput) {
    const user: User = {
      id: randomUUID(),
      name,
      email,
      password_hash,
      created_at: new Date(),
    }

    this.items.push(user)

    return user
  }

  async findByEmail(email: string) {
    const user: User | undefined = this.items.find(
      (item) => item.email === email,
    )

    if (!user) {
      return null
    }

    return user
  }

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }
}
