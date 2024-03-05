import { InMemoryCheckInRepository } from '@/repositories/in-memory/InMemoryCheckInRepository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchUserCheckInsHistoryService } from './FetchUserCheckInsHistoryService'

let checkInRepository: InMemoryCheckInRepository

let sut: FetchUserCheckInsHistoryService

describe('Fetch User Check Ins History Service', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository()

    sut = new FetchUserCheckInsHistoryService(checkInRepository)
  })

  it('should be able to fetch check ins history', async () => {
    await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    await checkInRepository.create({
      gym_id: 'gym-03',
      user_id: 'user-01',
    })

    const { checkIns } = await sut.execute({ userId: 'user-01', page: 1 })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-01' }),
      expect.objectContaining({ gym_id: 'gym-03' }),
    ])
  })

  it('should be able to fetch paginated user check in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInRepository.create({
        gym_id: `gym-0${i}`,
        user_id: 'user-01',
      })
    }

    const { checkIns } = await sut.execute({ userId: 'user-01', page: 2 })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-021' }),
      expect.objectContaining({ gym_id: 'gym-022' }),
    ])
  })
})
