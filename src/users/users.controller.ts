/*eslint-disable*/
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAllUsers();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findOneUser(id);
  }

  @Post()
  create(@Body() body: { name: string; email: string }) {
    return this.usersService.createUser(body.name, body.email);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() body: { name: string; email: string },
  ) {
    return this.usersService.updateUser(id, body.name, body.email);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.usersService.deleteUser(id);
  }
}
