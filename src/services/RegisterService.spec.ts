import { InMemoryUserRepository } from '@/repositories/in-memory/InMemoryUserRepository'
import { RegisterService } from './RegisterService'

import { UserAlreadyExistsError } from './errors/UserAlreadyExistsError'

import { describe, expect, it } from 'vitest'
import { compare } from 'bcryptjs'

describe('Register Service', () => {
  it('should be able to register', async () => {
    const usersRepository = new InMemoryUserRepository()

    const registerService = new RegisterService(usersRepository)

    const { user } = await registerService.execute({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUserRepository()

    const registerService = new RegisterService(usersRepository)

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
    const usersRepository = new InMemoryUserRepository()

    const registerService = new RegisterService(usersRepository)

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
