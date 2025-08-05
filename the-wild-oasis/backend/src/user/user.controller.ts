import {
  Controller,
  Get,
  UseGuards,
  Patch,
  Body,
  SetMetadata,
  Delete,
  Param,
} from '@nestjs/common';
import { GetUser } from '../auth/decorator/index';
import { JwtGuard } from '../auth/guard/jtw.guard';
import { User } from './user.entity';
import { EditUserDto } from './dto';
import { UserService } from './user.service';
import { Role } from 'src/auth/enums/role.enums';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { RolesGuard } from 'src/auth/guard/roles/roles.guard';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getMe(@GetUser() user: User, @GetUser('email') email: string) {
    console.log(email);
    return user;
  }

  @Patch()
  editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
  //deleteUser
  /**
  @Post()
  create(): string {
    return 'Add a new user';
  }

  @Get()
  findAll(): string {
    return 'This will find all the users';
  }

  @Get()
  findOne(@Param('id') id: string): string {
    return `This return the user #${id}`;
  }
  @Get()
  findAllWithRequest(@Req() request: Request): string {
    return 'This will return all the users ';
  }
  */
}
