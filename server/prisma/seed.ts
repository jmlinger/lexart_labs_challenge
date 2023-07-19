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
      message: 'Frequently asked questions about loan:',
      options: 'Do you want to apply for a loan?',
      info: 'A personal loan is money that you borrow for just about any purpose. You can get a personal loan through a bank, credit union, credit card issuer, or online financial lender. You can normally apply online or in person and will have to provide some basic personal a Rinancial information. Your lender will consider your employment status, incom Rutstanding debts, and overall credit score to assess whether you are eligible for a loan a Retermine the interest rate that you will pay.',
      references:
        'https://www.investopedia.com/articles/personal-finance/010516/how-apply-personal-loan.asp',
    },
  })
  const info2 = await prisma.answer.create({
    data: {
      group: 'loan info',
      keywords: 'loan',
      message: 'Frequently asked questions about loan:',
      options: 'Loan conditions',
      info: 'These Loan Conditions will apply to each Loan Contract entered into through the Lending Platform for a cash loan. We will pay the amount of credit to your Nominated Account. You must repay the total amount payable under each Loan Contract by paying the Repayments on the Repayment Date shown in the Loan Contract or, where you enter into more than one Loan Contract at or about the same time.',
      references: 'https://secure2.zopa.com/loan_conditions',
    },
  })
  const info3 = await prisma.answer.create({
    data: {
      group: 'loan info',
      keywords: 'loan',
      message: 'Frequently asked questions about loan:',
      options: 'Help',
      info: 'What can we help you with today? Loans, Financial support, Credit card, Car finance, Investments, Smart Savings Hub, Fixed Term Savings, Borrowing Power, Zopa app, My Zopa account, Uploading documents.',
      references: 'https://www.zopa.com/help',
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
