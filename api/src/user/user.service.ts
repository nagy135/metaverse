import { User } from '@entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { BCRYPT_SALT_ROUNDS } from '@constants/bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOneByNickname(nickname: string): Promise<User> {
    return this.usersRepository.findOneOrFail({ where: { nickname } });
  }

  async createUser(nickname: string, password: string): Promise<User> {
    const user = this.usersRepository.create({
      nickname,
      password: await bcrypt.hash(password, BCRYPT_SALT_ROUNDS),
    });
    return await user.save();
  }
}
