import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

export async function conversationRoutes(app: FastifyInstance) {
  app.get('/conversation', async (request, reply) => {
    const response = await prisma.conversation.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return response
  })

  app.post('/conversation', async (request) => {
    const bodySchema = z.object({
      userName: z.string(),
      text: z.string(),
    })
    const { userName, text } = bodySchema.parse(request.body)

    const user = await prisma.user.findFirst({
      where: {
        name: userName,
      },
    })

    if (!user) {
      return {
        message: 'User does not exist.',
      }
    }

    await prisma.conversation.create({
      data: {
        userId: user.id,
        text,
      },
    })
  })
}
