import { InMemoryGymRepository } from '@/repositories/in-memory/InMemoryGymRepository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchGymsService } from './SearchGymsService'

let gymRepository: InMemoryGymRepository

let sut: SearchGymsService

describe('Search Gyms Service', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymRepository()

    sut = new SearchGymsService(gymRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymRepository.create({
      title: 'JavaScript',
      description: '',
      phone: null,
      created_at: new Date(),
      latitude: -21.7843936,
      longitude: -46.594523,
    })

    await gymRepository.create({
      title: 'TypeScript',
      description: '',
      phone: null,
      created_at: new Date(),
      latitude: -21.7843936,
      longitude: -46.594523,
    })

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'JavaScript' })])
  })

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymRepository.create({
        title: `JavaScript Gym ${i}`,
        description: '',
        phone: null,
        created_at: new Date(),
        latitude: -21.7843936,
        longitude: -46.594523,
      })
    }

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym 21' }),
      expect.objectContaining({ title: 'JavaScript Gym 22' }),
    ])
  })
})
