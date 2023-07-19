import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const salutation = await prisma.answer.create({
    data: {
      group: 'salutation',
      keywords: 'hello, good, i want',
      message:
        'Hello, I am a financial assistent. I am here to help you to understand better the financial world.',
    },
  })
  const login1 = await prisma.answer.create({
    data: {
      group: 'login',
      keywords: 'i am a financial assistent',
      message:
        'First of all we need you to login. Even if you are not registered fill in the fields, we will create a user for you! Please enter your username.',
    },
  })
  const login2 = await prisma.answer.create({
    data: {
      group: 'login',
      keywords: 'username',
      message: 'Now, please enter your password.',
    },
  })
  const info1 = await prisma.answer.create({
    data: {
      group: 'loan info',
      keywords: 'loan',
      message:
        'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout:',
      options: 'Do you want to apply for a loan?',
      info: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      references: 'https://www.lipsum.com/',
    },
  })
  const info2 = await prisma.answer.create({
    data: {
      group: 'loan info',
      keywords: 'loan',
      message:
        'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout:',
      options: 'Loan conditions',
      info: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      references: 'https://www.lipsum.com/',
    },
  })
  const info3 = await prisma.answer.create({
    data: {
      group: 'loan info',
      keywords: 'loan',
      message:
        'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout:',
      options: 'Help',
      info: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      references: 'https://www.lipsum.com/',
    },
  })
  const farewell = await prisma.answer.create({
    data: {
      group: 'farewell',
      keywords: 'goodbye, bye',
      message:
        'Thank you for this pleasant chat. Come back if you need more information.',
    },
  })

  console.log({ salutation, login1, login2, info1, info2, info3, farewell })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
