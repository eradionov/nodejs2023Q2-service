import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../type/jwt-payload';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refresh'),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET_REFRESH_KEY'),
    });
  }

  async validate(payload: JwtPayload) {
    return payload;
  }
}
