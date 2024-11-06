import { compare } from "bcryptjs";
import { UsersRepository } from "../repositories/users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials.error";

interface AutenticateServiceRequest {
    email: string,
    password: string
}

interface AutenticateServiceResponse {
    message: string
} 

export class AutenticateService {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ email, password}: AutenticateServiceRequest): Promise<AutenticateServiceResponse> {
        const auth = await this.usersRepository.findByEmail(email)

        if (!auth) {
            throw new InvalidCredentialsError()
        }

        const doesPasswordsMaches = await compare(password, auth.password_hash)

        if (!doesPasswordsMaches) {
            throw new InvalidCredentialsError()
        }

        return {
            message: 'Login successful'
        }

    }
}