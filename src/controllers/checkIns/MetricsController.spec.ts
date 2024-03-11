import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/tests/createAndAuthenticateUser'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Metrics Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get mestrics check ins', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const responseCreateGym = await request(app.server)
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

    await request(app.server)
      .post(`/gyms/${responseCreateGym.body.gym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        userLatitude: -21.7843936,
        userLongitude: -46.594523,
      })

    const response = await request(app.server)
      .get('/check-ins/metrics')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.checkInsCount).toEqual(1)
  })
})
