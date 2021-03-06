import AppError from '../../../shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      email: 'teste@teste.com',
      name: 'Teste',
      password: '1234455',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('Teste');
    expect(profile.email).toBe('teste@teste.com');
  });

  it('should not be able to show the profile from non-existing user', async () => {
    expect(
      showProfile.execute({
        user_id: 'user.id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
