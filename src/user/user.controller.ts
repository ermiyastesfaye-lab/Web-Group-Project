import { UserService } from './user.service';
import { Controller, Get, Param } from '@nestjs/common';
import { UserDetails } from './user.interface';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAllUsers(): Promise<UserDetails[]> {
    return this.userService.findAll(); // Assuming you have a method like findAll in your UserService
  }

  @Get(':id')
  getUser(@Param('id') id: string): Promise<UserDetails | null> {
    return this.userService.findById(id);
  }
}