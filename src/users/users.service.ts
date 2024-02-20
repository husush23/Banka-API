/*eslint-disable*/
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOneUser(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  async createUser(name: string, email: string): Promise<User> {
    const newUser = this.usersRepository.create({ name, email });
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async updateUser(id: number, name: string, email: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (user) {
      user.name = name;
      user.email = email;
      await this.usersRepository.save(user);
      return user;
    }
    return null;
  }

  async deleteUser(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
