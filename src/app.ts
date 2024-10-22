import fastify from 'fastify'
import { z } from 'zod'
import { prisma } from './lib/prisma'

export const app = fastify()

app.post('/users', async (request, reply) => {
  const registerBodySchema = z.object({
    name: z.string(),
    birthDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: 'Invalid date format',
    }),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, birthDate, email, password } = registerBodySchema.parse(
    request.body,
  )

  try {
    const newUser = await prisma.$transaction(async (prisma) => {
      // Criar o usuário na tabela `User`
      const user = await prisma.user.create({
        data: {
          name,
          birth_date: new Date(birthDate),
        },
      })

      // Criar o auth vinculado ao usuário
      const auth = await prisma.auth.create({
        data: {
          email,
          password_hash: password,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      })

      return { user, auth }
    })

    reply.send(newUser)
  } catch (error) {
    reply.status(500).send({ error: 'Erro ao criar o usuário e o auth' })
  }
})
