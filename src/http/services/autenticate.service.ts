import { compare } from 'bcryptjs'
import { UsersRepository } from '../repositories/users-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials.error'

interface AuthenticateServiceRequest {
  email: string
  password: string
}

interface AuthenticateServiceResponse {
  message: string
}

export class AuthenticateService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateServiceRequest): Promise<AuthenticateServiceResponse> {
    const auth = await this.usersRepository.findByEmail(email)

    if (!auth) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordsMaches = await compare(password, auth.password_hash)

    if (!doesPasswordsMaches) {
      throw new InvalidCredentialsError()
    }

    return {
      message: 'Login successful',
    }
  }
}
