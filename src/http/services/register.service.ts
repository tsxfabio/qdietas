import { prisma } from '../../lib/prisma'

type RegisterUserProps = {
  email: string
  password_hash: string
  name: string
  birthDate: string
}

export const RegisterUser = async ({
  email,
  password_hash,
  name,
  birthDate,
}: RegisterUserProps) => {
  try {
    await prisma.$transaction(async (prisma) => {
      // Criar o usuário na tabela `User`
      const user = await prisma.user.create({
        data: {
          name,
          birth_date: new Date(birthDate),
        },
      })

      // Criar o auth vinculado ao usuário
      await prisma.auth.create({
        data: {
          email,
          password_hash,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      })
    })

    return {
      message: 'Usuário criado com sucesso',
    }
  } catch (error) {
    throw new Error('Erro ao criar o usuário e o auth')
  } finally {
    prisma.$disconnect()
  }
}
