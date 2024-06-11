import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { ServerExceptionsFilter } from './filters/serverexceptions.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(helmet());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strips properties that do not have any decorators
      forbidNonWhitelisted: true, // Throws an error if non-whitelisted properties are found
      transform: true, // Automatically transforms payloads to be objects typed according to their DTO classes
    }),
  );

  app.useGlobalFilters(new ServerExceptionsFilter());

  const config = new DocumentBuilder()
    .setTitle('Nest Demo API')
    .setDescription('Demostration API to show how to use NestJS to make a backend project.')
    .setVersion('1.0')
    .addTag('API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port, () =>
    console.log(`Server listening on http://localhost:${port}`),
  );
}
bootstrap();
