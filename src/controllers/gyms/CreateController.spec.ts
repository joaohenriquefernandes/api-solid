import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/tests/createAndAuthenticateUser'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Create Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create gym', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Gym JS',
        description: 'Some description',
        phone: '35999999999',
        created_at: new Date(),
        latitude: -21.7843936,
        longitude: -46.594523,
      })

    expect(response.statusCode).toEqual(201)
    expect(response.body.gym).toHaveProperty('id')
  })
})
