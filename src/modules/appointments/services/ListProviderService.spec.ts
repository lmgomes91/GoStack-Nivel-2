// import AppError from '../../../shared/errors/AppError';

import FakeUsersRepository from '../../users/repositories/fakes/FakeUsersRepository';
import ListProviderService from './ListProviderService';

let fakeUsersRepository: FakeUsersRepository;
let listProvider: ListProviderService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProvider = new ListProviderService(fakeUsersRepository);
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      email: 'user1@user.com',
      name: 'user1',
      password: 'aaaaaaa',
    });
    const user2 = await fakeUsersRepository.create({
      email: 'user2@user.com',
      name: 'user2',
      password: 'bbbbbbb',
    });

    const loggedUser = await fakeUsersRepository.create({
      email: 'logged@user.com',
      name: 'loggedUser',
      password: '123456',
    });

    const providers = await listProvider.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});