import { z } from 'zod'
import { hash } from 'bcryptjs'
import { FastifyRequest, FastifyReply } from 'fastify'
import { RegisterUser } from '../services/register.service'

export const register = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
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

  const password_hash = await hash(password, 6)

  try {
    const result = await RegisterUser({
      email,
      name,
      birthDate,
      password_hash,
    })

    reply.status(201).send(result)
  } catch (error) {
    console.error(error)
    reply.status(500).send({ error: 'Internal server error' })
  }
}
