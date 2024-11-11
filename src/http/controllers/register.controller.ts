import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeRegisterService } from '../services/factories/make-register-service'

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

  try {
    const registerUserService = makeRegisterService()

    const result = await registerUserService.execute({
      email,
      name,
      birthDate,
      password,
    })

    reply.status(201).send(result)
  } catch (error) {
    throw new Error()
  }
}
