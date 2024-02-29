import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'

import { InMemoryUserRepository } from '@/repositories/in-memory/InMemoryUserRepository'
import { AuthenticateService } from './AuthenticateService'
import { InvalidCredentialsError } from './errors/InvalidCredentialsError'

let usersRepository: InMemoryUserRepository

let sut: AuthenticateService

describe('Authenticate Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository()
    sut = new AuthenticateService(usersRepository)
  })

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'johndoe@mail.com',
      password: '123456',
    })

    expect(user).toHaveProperty('id')
    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    expect(() =>
      sut.execute({
        email: 'johndoe@mail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password_hash: await hash('123456', 6),
    })

    expect(() =>
      sut.execute({
        email: 'johndoe@mail.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
