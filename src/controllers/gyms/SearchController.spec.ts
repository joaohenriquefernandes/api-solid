import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/tests/createAndAuthenticateUser'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Search Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search a gym by title', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Gym JS',
        description: 'Some description',
        phone: '35999999999',
        created_at: new Date(),
        latitude: -21.7850723,
        longitude: -46.5844714,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Gym TS',
        description: 'Some description',
        phone: '35999999999',
        created_at: new Date(),
        latitude: -20.7446573,
        longitude: -46.7530458,
      })

    const response = await request(app.server)
      .get('/gyms/search')
      .query({
        page: 1,
        query: 'JS',
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Gym JS',
      }),
    ])
  })
})
