import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const response = await request(app.server).post('/register').send({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(201)
    expect(response.body.user).toHaveProperty('id')
  })
})
