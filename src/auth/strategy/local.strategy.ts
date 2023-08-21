import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'login' });
  }

  async validate(login: string, password: string) {
    const user = await this.authService.validateUser(login, password);

    if (user === null) {
      throw new ForbiddenException();
    }

    return user;
  }
}
