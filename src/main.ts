import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { corsOptions } from './common/options';
import { ValidationPipe } from '@nestjs/common';
import { LoggerProvider } from './common/providers';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(corsOptions);
  app.useLogger(new LoggerProvider());
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 9000);
}
bootstrap();
