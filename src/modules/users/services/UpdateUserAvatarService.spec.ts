// src/modules/users/services/UpdateUserAvatarService.spec.ts
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });
  it('should be able to update user avatar', async () => {
    const user = await fakeUsersRepository.create({
      name: 'User',
      email: 'user@useremail.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar_teste.jpg',
    });

    expect(user.avatar).toBe('avatar_teste.jpg');
  });

  it('should not be able to update avatar for an unauthenticated user', async () => {
    await expect(
      updateUserAvatar.execute({
        user_id: 'User',
        avatarFilename: 'avatar_teste.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete existing user avatar before updating a new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({
      name: 'User',
      email: 'user@useremail.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar_teste.jpg',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar_teste2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar_teste.jpg');
    expect(user.avatar).toBe('avatar_teste2.jpg');
  });
});
