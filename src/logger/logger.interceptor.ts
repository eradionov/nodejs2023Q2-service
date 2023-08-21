import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { CustomLoggerService } from './custom.logger.service';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private readonly logger: CustomLoggerService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse();

    return next
      .handle()
      .pipe(tap((body) => this.logger.logResponse(response.statusCode, body)));
  }
}
