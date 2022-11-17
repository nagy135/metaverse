import * as bcrypt from 'bcrypt';
import { Dependencies, Injectable } from '@nestjs/common';
import { UserService } from '@user/user.service';
import { BCRYPT_SALT_ROUNDS } from '@constants/bcrypt';

@Injectable()
@Dependencies(UserService)
export class AuthService {
  constructor(private readonly usersService: UserService) {}

  async validateUser(nickname: string, password: string) {
    const user = await this.usersService.findOneByNickname(nickname);
    const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
    if (user && user.password === hashedPassword) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
