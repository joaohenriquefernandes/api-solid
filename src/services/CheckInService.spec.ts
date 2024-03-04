import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInService } from './CheckInService'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/InMemoryCheckInRepository'
import { InMemoryGymRepository } from '@/repositories/in-memory/InMemoryGymRepository'
import { Decimal } from '@prisma/client/runtime/library'

let checkInRepository: InMemoryCheckInRepository
let gymRepository: InMemoryGymRepository

let sut: CheckInService
describe('Check In Service', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository()
    gymRepository = new InMemoryGymRepository()

    sut = new CheckInService(checkInRepository, gymRepository)

    gymRepository.items.push({
      id: 'gym-id',
      title: 'JS Gym',
      description: '',
      created_at: new Date(),
      phone: '',
      latitude: new Decimal(String(-21.7843936)),
      longitude: new Decimal(String(-46.594523)),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -21.7843936,
      userLongitude: -46.594523,
    })

    expect(checkIn).toHaveProperty('id')
    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in same day', async () => {
    vi.setSystemTime(new Date(2024, 2, 1, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -21.7843936,
      userLongitude: -46.594523,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-id',
        userId: 'user-id',
        userLatitude: -21.7843936,
        userLongitude: -46.594523,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice in different day', async () => {
    vi.setSystemTime(new Date(2024, 2, 1, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -21.7843936,
      userLongitude: -46.594523,
    })

    vi.setSystemTime(new Date(2024, 2, 2, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -21.7843936,
      userLongitude: -46.594523,
    })

    expect(checkIn).toHaveProperty('id')
    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distance gym', async () => {
    await gymRepository.create({
      id: 'gym-id-02',
      title: 'JS Gym',
      latitude: -21.7848214,
      longitude: -46.557713,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-id-02',
        userId: 'user-id',
        userLatitude: -21.7843936,
        userLongitude: -46.594523,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
