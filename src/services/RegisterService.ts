import { IUserRepository } from '@/repositories/interfaces/IUserRepository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/UserAlreadyExistsError'
import { User } from '@prisma/client'

interface IRegisterServiceRequest {
  name: string
  email: string
  password: string
  role?: 'ADMIN' | 'MEMBER'
}

interface IRegisterServiceResponse {
  user: User
}

export class RegisterService {
  constructor(private userRepository: IUserRepository) {}
  async execute({
    name,
    email,
    password,
    role,
  }: IRegisterServiceRequest): Promise<IRegisterServiceResponse> {
    const isEmailAlreadyExists = await this.userRepository.findByEmail(email)

    if (isEmailAlreadyExists) {
      throw new UserAlreadyExistsError()
    }

    const password_hash = await hash(password, 6)

    const user = await this.userRepository.create({
      name,
      email,
      password_hash,
      role,
    })

    return { user }
  }
}
