import { PrismaUsersRepository } from '../../repositories/prisma/prisma-ursers-repository'
import { AuthenticateService } from '../autenticate.service'

export const makeAuthenticateService = () => {
  const repository = new PrismaUsersRepository()
  const authenticateService = new AuthenticateService(repository)

  return authenticateService
}
