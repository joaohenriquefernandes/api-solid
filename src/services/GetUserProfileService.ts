import { IUserRepository } from '@/repositories/interfaces/IUserRepository'
import { ResourceNotFoundError } from './errors/ResourceNotFoundError'
import { User } from '@prisma/client'

interface IGetUserProfileServiceRequest {
  userId: string
}

interface IGetUserProfileServiceResponse {
  user: User
}

export class GetUserProfileService {
  constructor(private usersRepository: IUserRepository) {}

  async execute({
    userId,
  }: IGetUserProfileServiceRequest): Promise<IGetUserProfileServiceResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return { user }
  }
}
