import 'dotenv/config'

import fastify from 'fastify'
import cors from '@fastify/cors'
import { loginRoutes } from './routes/login'
import { answerRoutes } from './routes/answer'
import { conversationRoutes } from './routes/conversation'
import fastifyStatic from '@fastify/static'
import { resolve } from 'path'

const app = fastify()

app.register(fastifyStatic, {
  root: resolve(__dirname, '../exports'),
  prefix: '/exports',
})

app.register(cors, {
  origin: true,
})

app.register(loginRoutes)
app.register(answerRoutes)
app.register(conversationRoutes)

app
  .listen({
    host: '0.0.0.0',
    port: process.env.PORT ? Number(process.env.PORT) : 3333,
  })
  .then(() => {
    console.log(`HTTP Server Running`)
  })
