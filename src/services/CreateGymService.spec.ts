import { InMemoryGymRepository } from '@/repositories/in-memory/InMemoryGymRepository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateGymService } from './CreateGymService'

let gymRepository: InMemoryGymRepository

let sut: CreateGymService

describe('Create Gym Service', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymRepository()

    sut = new CreateGymService(gymRepository)
  })

  it('should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'JS Gym',
      description: '',
      phone: null,
      created_at: new Date(),
      latitude: -21.7843936,
      longitude: -46.594523,
    })

    expect(gym).toHaveProperty('id')
    expect(gym.id).toEqual(expect.any(String))
  })
})
