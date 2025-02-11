import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Fetch user name (protected by JwtAuthGuard)
  @Get('profile')
  @UseGuards(JwtAuthGuard)  // Protecting the route with JwtAuthGuard
  async getProfile(@Req() req) {
    // User data is in req.user after validation by JwtAuthGuard
    return await this.usersService.getUser(req.user.userId);
    // Send back only the name
  }
}
