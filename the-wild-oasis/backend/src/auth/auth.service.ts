/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import { QueryFailedError } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import 'dotenv/config';
import type { Response } from 'express';

@Injectable({})
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwt: JwtService,
  ) {}

  async signup(dto: AuthDto) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(dto.password, saltOrRounds);
    const user = {
      email: dto.email,
      hashed_password: hash,
    };
    try {
      await this.userRepository.save(user);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const driverError = error as any;
        ///console.log(driverError);
        if (driverError.number === 2627) {
          throw new ForbiddenException('User with this email already exists');
        }
      }
      throw new ForbiddenException('Error signing up user');
    }
    return { msg: 'User inserted successfully' };
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async signin(dto: AuthDto, @Res({ passthrough: true }) response: Response) {
    const user = await this.findUserByEmail(dto.email);
    //console.log(user);
    if (user) {
      const checkPassword = await bcrypt.compare(
        dto.password,
        user.hashed_password,
      );
      if (!checkPassword) {
        throw new UnauthorizedException('Incorrect password');
      }
    } else {
      throw new NotFoundException('User with this email does not exist');
    }
    const jwt = await this.signToken(user.id, user.email);
    response.cookie('jwt', jwt, { httpOnly: true });
    return { msg: 'Login successful' };
  }

  async signToken(
    id: number,
    email: string,
  ): Promise<{ ACCESS_TOKEN: string }> {
    const payload = {
      sub: id,
      email,
    };
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '30m',
      secret: process.env.JWT_SECRET!,
    });
    return {
      ACCESS_TOKEN: token,
    };
  }

  logOut(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    return 'Logged out';
  }
}
