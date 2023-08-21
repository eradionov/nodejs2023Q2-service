import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RefreshJwtAuthenticationGuard extends AuthGuard('jwt-refresh') {}
