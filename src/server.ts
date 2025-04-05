import fastify from 'fastify'
import cryto from 'node:crypto'
import { knex } from './database'
import { env } from './env'

const app = fastify()

app.get('/insert', async () => {
  const transactions = await knex('transactions')
    .insert({
      id: cryto.randomUUID(),
      title: 'Transação teste',
      amount: 1000,
    })
    .returning('*')

  return transactions
})

app.get('/select', async () => {
  const transactions = await knex('transactions')
    .where('amount', 1000)
    .select('*')

  return transactions
})

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP Server Running!')
  })
