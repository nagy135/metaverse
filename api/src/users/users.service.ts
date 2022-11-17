import * as bcrypt from 'bcrypt';
import { User } from '@entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BCRYPT_SALT_ROUNDS } from '@constants/bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findOneByUsername(username: string): Promise<User | undefined> {
    return this.usersRepository.findOneOrFail({ where: { username } });
  }

  async createUser(username: string, password: string): Promise<User> {
    const user = this.usersRepository.create({
      username,
      password: await bcrypt.hash(password, BCRYPT_SALT_ROUNDS),
    });
    return await user.save();
  }
}
