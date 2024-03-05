import { InMemoryCheckInRepository } from '@/repositories/in-memory/InMemoryCheckInRepository'
import { beforeEach, describe, expect, it } from 'vitest'
import { ValidateCheckInService } from './ValidateCheckInService'

let checkInRepository: InMemoryCheckInRepository

let sut: ValidateCheckInService

describe('Validate Check In Service', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository()

    sut = new ValidateCheckInService(checkInRepository)
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
})
