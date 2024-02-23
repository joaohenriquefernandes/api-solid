import { IUserRepository } from '@/repositories/interfaces/IUserRepository'
import { hash } from 'bcryptjs'

interface IUserServiceRequest {
  name: string
  email: string
  password: string
}

export class RegisterService {
  constructor(private userRepository: IUserRepository) {}
  async execute({ name, email, password }: IUserServiceRequest) {
    const isEmailAlreadyExists = await this.userRepository.findByEmail(email)

    if (isEmailAlreadyExists) {
      throw new Error('Email already exists')
    }

    const password_hash = await hash(password, 6)

    const user = await this.userRepository.create({
      name,
      email,
      password_hash,
    })

    return { user }
  }
}
