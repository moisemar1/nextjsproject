import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { User } from './user.entity';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async editUser(userId: number, dto: EditUserDto) {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException('User was not found');
    }

    if (dto.email) {
      user.email = dto.email;
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
        throw new ForbiddenException('Error changing the email');
      }
      return { msg: 'Email Updates succesfully' };
    }
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOneById(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
