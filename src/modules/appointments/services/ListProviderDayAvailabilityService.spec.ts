// src/modules/appointments/services/ListProviderDayAvailabilityService.spec.ts
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the free schedules in a day from a provider', async () => {
    await fakeAppointmentsRepository.create({
      user_id: '123123',
      provider_id: 'user',
      date: new Date(2020, 7, 1, 14, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      user_id: '123123',
      provider_id: 'user',
      date: new Date(2020, 7, 1, 15, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 7, 1, 10, 0, 0).getTime();
    });

    const availability = await listProviderDayAvailability.execute({
      provider_id: 'user',
      year: 2020,
      month: 8,
      day: 1,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 10, available: false },
        { hour: 11, available: true },
        { hour: 9, available: false },
        { hour: 8, available: false },
      ]),
    );
  });
});
