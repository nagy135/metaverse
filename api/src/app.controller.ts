import { User } from '@entities/user.entity';
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ValidationPipe } from '@pipes/validation.pipe';
import { UserDto } from '@users/dto/user.dto';
import { UsersService } from '@users/users.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('signup')
  async signup(@Body(new ValidationPipe()) body: UserDto): Promise<User> {
    const { username, password } = body;
    return this.usersService.createUser(username, password);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any): Promise<{ access_token: string }> {
    return this.authService.login(req.user);
  }
}
