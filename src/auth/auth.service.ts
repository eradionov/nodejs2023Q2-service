import {Injectable, UseGuards, Request} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { compare } from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import {LocalAuthenticationGuard} from "./guard/local-authentication.guard";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService = new ConfigService(),
  ) {}
  async validateUser(login: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByLogin(login);

    if (null === user || !(await compare(pass, user.password))) {
      return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;

    return result;
  }

  @UseGuards(LocalAuthenticationGuard)
  async login(user: User) {
    const tokens = this.generateTokens(user.login, user.id);
    await this.userService.refreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async refreshToken(user: User) {
    const tokens = this.generateTokens(user.login, user.id);
    await this.userService.refreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  private generateTokens(login: string, userId: string) {
    const data = { username: login, sub: userId, userId: userId };

    return {
      login,
      userId,
      accessToken: this.jwtService.sign(data, {
        secret: this.config.get('JWT_SECRET_KEY'),
        expiresIn: '3600s',
      }),
      refreshToken: this.jwtService.sign(data, {
        secret: this.config.get('JWT_SECRET_REFRESH_KEY'),
        expiresIn: '7d',
      }),
    };
  }
}
