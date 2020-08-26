// src/modules/users/services/ShowProfileService.spec.ts
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfileService = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'User',
      email: 'user@usermail.com',
      password: '123456',
    });

    const profile = await showProfileService.execute(user.id);

    expect(profile.name).toBe('User');
    expect(profile.email).toBe('user@usermail.com');
  });

  it('should be not able to show the profile from non-existing user', async () => {
    await expect(
      showProfileService.execute('non-existing-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
