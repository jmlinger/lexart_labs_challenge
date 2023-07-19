/* eslint-disable no-array-constructor */
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function answerRoutes(app: FastifyInstance) {
  app.post('/answer', async (request, _reply) => {
    const userSchema = z.object({
      message: z.string(),
    })

    const { message } = userSchema.parse(request.body)

    const allAnswers = await prisma.answer.findMany()
    const allKeywords: Array<string> = []

    allAnswers.forEach(({ keywords }) => {
      keywords.split(', ').forEach((keyword) => allKeywords.push(keyword))
    })

    const matchedKeywords = allKeywords.filter((keyword) => {
      return message.toLowerCase().includes(keyword.toLowerCase())
    })

    if (matchedKeywords.length === 0) {
      return { message: 'Sorry, I do not understand.' }
    }

    const catchTheBiggestKeyword = matchedKeywords.reduce(
      (prevWord, currWord) =>
        prevWord.length < currWord.length ? currWord : prevWord,
    )

    const matchedAnswers = await prisma.answer.findMany({
      where: {
        keywords: {
          contains: catchTheBiggestKeyword,
        },
      },
    })

    if (!matchedAnswers[0].options) {
      return {
        message: matchedAnswers[0].message,
      }
    }

    return matchedAnswers.reduce(
      (acc, curr) => {
        acc.options.push(curr.options)
        acc.info.push(curr.info)
        acc.references.push(curr.references)

        return {
          message: matchedAnswers[0].message,
          options: acc.options,
          info: acc.info,
          references: acc.references,
        }
      },
      {
        message: matchedAnswers[0].message,
        options: new Array(),
        info: new Array(),
        references: new Array(),
      },
    )
  })
}
