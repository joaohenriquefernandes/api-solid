import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Profile Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get profile', async () => {
    await request(app.server).post('/register').send({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'johndoe@mail.com',
      password: '123456',
    })

    const { token } = authResponse.body

    const response = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.user).toHaveProperty('id')
    expect(response.body.user).toEqual(
      expect.objectContaining({
        email: 'johndoe@mail.com',
      }),
    )
  })
})
