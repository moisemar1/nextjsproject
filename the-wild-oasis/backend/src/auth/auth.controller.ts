import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Request, Response } from 'express';
import { AuthDto } from './dto';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  ///@HttpCode(HttpStatus.OK)
  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto: AuthDto, @Res({ passthrough: true }) response: Response) {
    return this.authService.signin(dto, response);
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    return this.authService.logOut(response);
  }

  //@Post('signout')
  //signout() {
  //  return this.authService.signout();
  //}
}
