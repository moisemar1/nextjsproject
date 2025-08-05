import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { User } from '../../user/user.entity';
import { Repository } from 'typeorm';
import 'dotenv/config';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';
import { NotFoundError } from 'rxjs';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: (req) => {
        //console.log(req?.cookies?.jwt);
        if (
          !req ||
          !req.cookies ||
          !req.cookies.jwt ||
          !req.cookies.jwt.ACCESS_TOKEN
        )
          return null;
        try {
          return req?.cookies?.jwt.ACCESS_TOKEN;
        } catch (error) {
          throw new NotFoundError('msg');
        }
      },
      //ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET!,
    });
  }
  async validate(payload: { sub: number; email: string }) {
    const user = await this.userRepository.findOne({
      where: { id: payload.sub },
    });
    if (!user) {
      throw new Error('user not found');
    }
    const plainUser = instanceToPlain(user);
    delete plainUser?.hashed_password;
    //console.log(payload);
    return plainUser;
  }
}
