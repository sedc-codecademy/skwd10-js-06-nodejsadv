/* eslint-disable prettier/prettier */
import { Controller, Get, Body, Post, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';


@Controller('/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getAllUsers(): any {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id') userId: string): any {
      return this.userService.getUserById(userId)
  }

  @Post()
  addProduct(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    const generatedId = this.userService.insertUser(
        username,
        password
    );
    return { id: generatedId };
  }

  @Delete(':id')
  removeProduct(@Param('id') userId: string) {
      this.userService.deleteUser(userId);
      return null;
  }
}