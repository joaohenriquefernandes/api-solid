import { InMemoryCheckInRepository } from '@/repositories/in-memory/InMemoryCheckInRepository'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ValidateCheckInService } from './ValidateCheckInService'
import { LateCheckInValidationError } from './errors/LateCheckInValidationError'
import { ResourceNotFoundError } from './errors/ResourceNotFoundError'

let checkInRepository: InMemoryCheckInRepository

let sut: ValidateCheckInService

describe('Validate Check In Service', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository()

    sut = new ValidateCheckInService(checkInRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate the check-in', async () => {
    const createdCheckIn = await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const { checkIn } = await sut.execute({ checkInId: createdCheckIn.id })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInRepository.items[0].validated_at).toEqual(expect.any(Date))
  })

  it('should not be able to validate an inexistent check-in', async () => {
    await expect(() =>
      sut.execute({
        checkInId: 'inexistent-check-in',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to validate the check-in after 20 minutes of this creation', async () => {
    vi.setSystemTime(new Date(2024, 2, 5, 20, 0))

    const createdCheckIn = await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const twentyOneMinutesInMs = 1000 * 60 * 21

    vi.advanceTimersByTime(twentyOneMinutesInMs)

    await expect(() =>
      sut.execute({ checkInId: createdCheckIn.id }),
    ).rejects.toBeInstanceOf(LateCheckInValidationError)
  })
})
