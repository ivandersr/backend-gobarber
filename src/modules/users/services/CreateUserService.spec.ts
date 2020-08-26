// src/modules/users/services/CreateUserService.spec.ts
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider, fakeCacheProvider);
  });
  it('should be able to create a new users', async () => {
    const user = await createUser.execute({
      name: 'User',
      email: 'user@usermail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('User');
    expect(user.email).toBe('user@usermail.com');
  });

  it('should not be able to create a new user with and existing e-mail', async () => {
    await createUser.execute({
      name: 'User',
      email: 'user@usermail.com',
      password: '123456',
    });

    await expect(
      createUser.execute({
        name: 'User',
        email: 'user@usermail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
