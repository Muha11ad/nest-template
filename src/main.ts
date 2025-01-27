import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { corsOptions } from './common/options';
import { ValidationPipe } from '@nestjs/common';
import { LoggerProvider } from './common/providers';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(corsOptions);
  app.useLogger(new LoggerProvider());
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API documentation for my project')
    .setVersion('1.0')
    .addBearerAuth() // Add JWT or other authentication
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 9000);
}
bootstrap();
