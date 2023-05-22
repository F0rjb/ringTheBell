import {
  Controller,
  Patch,
  Get,
  UseGuards,
} from '@nestjs/common';

import { JwtGuard } from '../auth/guard';
import { User } from '@prisma/client';
import { EditUserDto } from './dto';
import { GetUser } from '../auth/decorator';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { UserService } from './user.service';
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  // GET /users/test
  constructor(private UserService: UserService) {}
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }
  @Patch()
  editUser(
    @GetUser('id') userId: number,
    @Body() dto: EditUserDto,
  ) {
    console.log(userId);
    return this.UserService.editUser(userId, dto);
  }
}
