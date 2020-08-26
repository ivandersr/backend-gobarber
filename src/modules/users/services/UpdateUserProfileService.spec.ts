// src/modules/users/services/UpdateUserProfileService.spec.ts
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserProfileService from './UpdateUserProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateUserProfile: UpdateUserProfileService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateUserProfile = new UpdateUserProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'User',
      email: 'user@useremail.com',
      password: '123456',
    });

    const updatedUser = await updateUserProfile.execute({
      user_id: user.id,
      name: 'User2',
      email: 'user2@usermail.com',
    });

    expect(updatedUser.name).toBe('User2');
    expect(updatedUser.email).toBe('user2@usermail.com');
  });

  it('should not be able to use an already existing email', async () => {
    const user = await fakeUsersRepository.create({
      name: 'User',
      email: 'user@useremail.com',
      password: '123456',
    });

    await fakeUsersRepository.create({
      name: 'User2',
      email: 'user2@usermail.com',
      password: '123456',
    });

    await expect(
      updateUserProfile.execute({
        user_id: user.id,
        name: 'User',
        email: 'user2@usermail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'User',
      email: 'user@useremail.com',
      password: '123456',
    });

    const updatedUser = await updateUserProfile.execute({
      user_id: user.id,
      name: 'User2',
      email: 'user2@usermail.com',
      password: '123123',
      old_password: '123456',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'User',
      email: 'user@useremail.com',
      password: '123456',
    });

    await expect(
      updateUserProfile.execute({
        user_id: user.id,
        name: 'User2',
        email: 'user2@usermail.com',
        password: '123123',
        old_password: 'wrong-old-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to udpate the profile of non-existing user', async () => {
    await expect(
      updateUserProfile.execute({
        user_id: 'non-existing-id',
        name: 'User2',
        email: 'user2@usermail.com',
        password: '123123',
        old_password: 'wrong-old-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password if the old password is not informed', async () => {
    const user = await fakeUsersRepository.create({
      name: 'User',
      email: 'user@useremail.com',
      password: '123456',
    });

    await expect(
      updateUserProfile.execute({
        user_id: user.id,
        name: 'User2',
        email: 'user2@usermail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
