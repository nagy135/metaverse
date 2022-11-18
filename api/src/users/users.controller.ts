import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { Controller, Get, Request, UseGuards } from '@nestjs/common';

@Controller('users')
export class UsersController {

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
