// src/modules/appointments/services/ListProvidersService.spec.ts
// import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeCacheProvider: FakeCacheProvider;
let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeCacheProvider = new FakeCacheProvider();
    fakeUsersRepository = new FakeUsersRepository();
    listProviders = new ListProvidersService(fakeUsersRepository, fakeCacheProvider);
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'User',
      email: 'user@usermail.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'User2',
      email: 'user2@usermail.com',
      password: '123456',
    });

    const authenticatedUser = await fakeUsersRepository.create({
      name: 'User3',
      email: 'user3@usermail.com',
      password: '123456',
    });

    const providers = await listProviders.execute(authenticatedUser.id);

    expect(providers).toEqual([user1, user2]);
  });
});
