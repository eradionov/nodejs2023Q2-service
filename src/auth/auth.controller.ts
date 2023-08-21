import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategy/local.strategy';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { RefreshJwtAuthenticationGuard } from './guard/refresh-jwt-authentication.guard';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../user/entities/user.entity';
import {LocalAuthenticationGuard} from "./guard/local-authentication.guard";

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @Post('signup')
  async register(@Body() userDTO: CreateUserDto) {
    return await this.userService.create(userDTO);
  }

  @UseGuards(RefreshJwtAuthenticationGuard)
  @Post('refresh')
  async refresh(@Request() req) {
    return await this.authService.refreshToken(req.user);
  }
}
