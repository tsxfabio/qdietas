
import { hash } from "bcryptjs"
import { UsersRepository } from "../repositories/users-repository"

type RegisterUserProps = {
  email: string
  password: string
  name: string
  birthDate: string
}

export class RegisterUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email, password, name, birthDate }: RegisterUserProps) {
    const password_hash = await hash(password, 6)
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new Error('Email already in use')
    }

    const data = await this.usersRepository.create({
      email,
      password_hash,
      name,
      birthDate,
    })

    return data
  }
}
