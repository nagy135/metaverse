import { User } from "@entities/user.entity";
import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserService } from "./user.service";

@Controller('users')
export class UserController {

  constructor(private readonly userService: UserService){
  }

  @Post('/signup')
  async signup(
    @Body('nickname') nickname: string,
    @Body('password') password: string
  ): Promise<User> {
    return this.userService.createUser(nickname, password);
  }

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(
    @Request() req: any
  ) {
    return req.user;
  }

  @Get()
  getUsers() {
    return this.userService.findAll()
  }
}
