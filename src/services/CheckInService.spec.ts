import { beforeEach, describe, expect, it } from 'vitest'
import { CheckInService } from './CheckInService'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/InMemoryCheckInRepository'

let checkInRepository: InMemoryCheckInRepository

let sut: CheckInService
describe('Check In Service', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository()
    sut = new CheckInService(checkInRepository)
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
    })

    expect(checkIn).toHaveProperty('id')
    expect(checkIn.id).toEqual(expect.any(String))
  })
})
