import { PrismaUsersRepository } from '../../repositories/prisma/prisma-ursers-repository'
import { RegisterUserService } from '../register.service'

export const makeRegisterService = () => {
  const userRepository = new PrismaUsersRepository()
  const registerUserService = new RegisterUserService(userRepository)

  return registerUserService
}
