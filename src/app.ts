import fastify from 'fastify'
import { appRouter } from './routes'

export const app = fastify()

app.register(appRouter)
