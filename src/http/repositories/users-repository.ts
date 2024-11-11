import { Auth, User } from '@prisma/client'

export interface CreateUserRepositoryProps {
  email: string
  password_hash: string
  name: string
  birthDate: string | Date
}

export interface UsersRepository {
  findByEmail(email: string): Promise<Auth | null>
  findById(id: string): Promise<User | null>
  create(data: CreateUserRepositoryProps): Promise<any>
}
