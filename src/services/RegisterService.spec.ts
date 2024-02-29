import { InMemoryUserRepository } from '@/repositories/in-memory/InMemoryUserRepository'
import { RegisterService } from './RegisterService'

import { UserAlreadyExistsError } from './errors/UserAlreadyExistsError'

import { beforeEach, describe, expect, it } from 'vitest'
import { compare } from 'bcryptjs'

let usersRepository: InMemoryUserRepository

let registerService: RegisterService

describe('Register Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository()

    registerService = new RegisterService(usersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await registerService.execute({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await registerService.execute({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to resgister with same email twice', async () => {
    const email = 'johndoe@mail.com'

    await registerService.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    await expect(() =>
      registerService.execute({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
