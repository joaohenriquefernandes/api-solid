import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin: boolean = false,
) {
  await request(app.server)
    .post('/register')
    .send({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'johndoe@mail.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
