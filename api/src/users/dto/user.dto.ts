import { IsString, Length } from 'class-validator';

export class UserDto {
  @IsString()
  username: string;

  @IsString()
  @Length(3)
  password: string;
}
