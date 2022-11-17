import { User } from '@entities/user.entity';
import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { UsersService } from '@users/users.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,

  ) {}

  @Post('/signup')
  async signup(
    @Body('username') username: string,
    @Body('password') password: string
  ): Promise<User> {
    return this.usersService.createUser(username, password);
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
