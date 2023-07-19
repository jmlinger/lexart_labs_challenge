import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function loginRoutes(app: FastifyInstance) {
  app.post('/login', async (request) => {
    const userSchema = z.object({
      name: z.string(),
      password: z.string(),
    })

    const { name, password } = userSchema.parse(request.body)

    let user = await prisma.user.findFirst({
      where: {
        name,
      },
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          name,
          password,
        },
      })
    }

    if (user.password !== password) {
      return {
        message:
          'The password does not match! Please enter the password again.',
      }
    }

    return {
      message: `It is a pleasure talking to you, ${name}. How can I help you?`,
    }
  })
}
