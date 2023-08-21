import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { CustomLoggerService } from './logger/custom.logger.service';

const configService = new ConfigService();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: true });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(
    bodyParser.json({
      type: (req: any) => req.get('Content-Type') === 'application/json',
      strict: false,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Rest Service')
    .setDescription('Rest Service API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const port = configService.get('INTERNAL_PORT') || 4000;

  SwaggerModule.setup('doc', app, document);

  const loggerService = app.get(CustomLoggerService);

  process.on('uncaughtException', (err, origin) => {
    loggerService.error(`Uncaught Exception: ${err}; ${origin}.`);
    process.exit(1);
  });

  process.on('unhandledRejection', (reason) => {
    loggerService.error(`Unhandled Rejection: ${reason}`);
  });

  await app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}

bootstrap();
