import { prisma } from '../../../lib/prisma'
import { CreateUserRepositoryProps, UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async findByEmail(email: string) {
    const auth = await prisma.auth.findUnique({
      where: {
        email,
      },
    })

    return auth
  }

  async findById(user_id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id: user_id,
      },
    })

    return user
  }

  async create(data: CreateUserRepositoryProps) {
    try {
      await prisma.$transaction(async (prisma) => {
        // Criar o usuário na tabela `User`
        const user = await prisma.user.create({
          data: {
            name: data.name,
            birth_date: new Date(data.birthDate),
          },
        })

        // Criar o auth vinculado ao usuário
        await prisma.auth.create({
          data: {
            email: data.email,
            password_hash: data.password_hash,
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
      throw new Error('Erro ao criar o usuário')
    }
  }
}
