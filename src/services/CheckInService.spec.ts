import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInService } from './CheckInService'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/InMemoryCheckInRepository'

let checkInRepository: InMemoryCheckInRepository

let sut: CheckInService
describe('Check In Service', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository()
    sut = new CheckInService(checkInRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
    })

    expect(checkIn).toHaveProperty('id')
    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in same day', async () => {
    vi.setSystemTime(new Date(2024, 2, 1, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-id',
        userId: 'user-id',
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice in different day', async () => {
    vi.setSystemTime(new Date(2024, 2, 1, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
    })

    vi.setSystemTime(new Date(2024, 2, 2, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
    })

    expect(checkIn).toHaveProperty('id')
    expect(checkIn.id).toEqual(expect.any(String))
  })
})
