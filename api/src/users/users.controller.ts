import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UsersService } from '@users/users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
