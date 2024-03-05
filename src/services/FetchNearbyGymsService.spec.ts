import { InMemoryGymRepository } from '@/repositories/in-memory/InMemoryGymRepository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchNearbyGymsService } from './FetchNearbyGymsService'

let gymRepository: InMemoryGymRepository

let sut: FetchNearbyGymsService

describe('Fetch Nearby Gym Service', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymRepository()

    sut = new FetchNearbyGymsService(gymRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymRepository.create({
      title: 'JS Gym',
      latitude: -21.7850723,
      longitude: -46.5844714,
    })

    await gymRepository.create({
      title: 'Python Gym',
      latitude: -20.7446573,
      longitude: -46.7530458,
    })

    const { gyms } = await sut.execute({
      userLatitude: -21.7829077,
      userLongitude: -46.5943873,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'JS Gym' })])
  })
})
