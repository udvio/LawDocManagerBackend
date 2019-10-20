import { Controller, Request, UseGuards, Post, Body, Get } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { User } from './app/users/dto/user.dto';
import { AuthService } from './auth/auth.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Body() req:User){
    return this.authService.login(req);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get('profile')
  async getProfile(@Request() req){
    return req.user;
  }
}
