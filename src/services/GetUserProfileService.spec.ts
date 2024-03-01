import { beforeEach, describe, expect, it } from 'vitest'
import { GetUserProfileService } from './GetUserProfileService'
import { hash } from 'bcryptjs'
import { InMemoryUserRepository } from '@/repositories/in-memory/InMemoryUserRepository'
import { ResourceNotFoundError } from './errors/ResourceNotFoundError'

let usersRepository: InMemoryUserRepository

let sut: GetUserProfileService

describe('Get User Profile Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository()

    sut = new GetUserProfileService(usersRepository)
  })

  it('should be able to get user profile', async () => {
    const userCreated = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password_hash: await hash('123456', 6),
    })

    const { id } = userCreated

    const { user } = await sut.execute({ userId: id })

    expect(user.name).toEqual('John Doe')
  })

  it('should not be able to get user profile with wrong id', async () => {
    expect(
      sut.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
