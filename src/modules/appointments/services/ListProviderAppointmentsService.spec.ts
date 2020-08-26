// src/modules/appointments/services/ListProviderAppointmentsService.spec.ts
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeCacheProvider: FakeCacheProvider;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointments: ListProviderAppointmentsService;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeCacheProvider = new FakeCacheProvider();
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
      fakeCacheProvider
    );

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
  });

  it('should be able to list the provider appointments from a day', async () => {
    const appointmentsDate = new Date(2020, 4, 10, 13);

    const appointment = await fakeAppointmentsRepository.create({
      date: appointmentsDate,
      provider_id: 'provider-id',
      user_id: 'user-id',
    });

    const appointmentsInDay = await listProviderAppointments.execute({
      year: appointmentsDate.getFullYear(),
      month: appointmentsDate.getMonth() + 1,
      day: appointmentsDate.getDate(),
      provider_id: 'provider-id',
    });

    expect(appointmentsInDay).toEqual([appointment]);
  });
});
