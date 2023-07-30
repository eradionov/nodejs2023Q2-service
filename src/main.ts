import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule, { bodyParser: true });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(
    bodyParser.json({
      type: (req: any) => req.get('Content-Type') === 'application/json',
      strict: false,
    }),
  );

  await app.listen(process.env.PORT);
}
bootstrap();
