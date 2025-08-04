import { IsEmail } from 'class-validator';

export class EditUserDto {
  @IsEmail()
  email: string;
}
