// src/modules/users/infra/typeorm/repositories/UsersRepository.ts
import { getRepository, Repository, Not } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';
import User from '../entities/User';

export default class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne(id);

    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({ where: { email } });

    return findUser;
  }

  public async findAllProviders(data: IFindAllProvidersDTO): Promise<User[]> {
    let users: User[];
    if (data.except_user_id) {
      users = await this.ormRepository.find({
        where: {
          id: Not(data.except_user_id),
        },
      });
    } else {
      users = await this.ormRepository.find();
    }

    return users;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const createdUser = this.ormRepository.create(userData);

    await this.ormRepository.save(createdUser);

    return createdUser;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}
