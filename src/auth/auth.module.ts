import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LocalStrategy } from './strategy/local.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { JwtStrategy } from './strategy/jwt.strategy';
import { RefreshTokenStrategy } from './strategy/refresh-token.strategy';
import { AuthController } from './auth.controller';

const configService = new ConfigService();

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: configService.get('JWT_SECRET_KEY'),
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [
    AuthService,
    JwtService,
    UserService,
    LocalStrategy,
    JwtStrategy,
    RefreshTokenStrategy,
  ],
  exports: [AuthModule],
  controllers: [AuthController],
})
export class AuthModule {}
