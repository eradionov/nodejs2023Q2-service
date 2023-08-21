import {Injectable, NestMiddleware, Request, Response} from '@nestjs/common';
import { NextFunction } from 'express';
import { CustomLoggerService } from './custom.logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: CustomLoggerService) {}
  use(req: Request, res: Response, next: NextFunction): any {
    this.logger.log(`
            ${req.method}: ${req.url}; Body: ${JSON.stringify(req.body)}
        `);

    next();
  }
}
