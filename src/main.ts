import 'dotenv/config';
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import helmet from 'helmet';
import handleUncaughtErrors from './eventHandlers/uncaughtErrors';
import {ValidationPipe} from '@nestjs/common';

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

  handleUncaughtErrors();

  const port = process.env.PORT || 3000;
  await app.listen(port, () =>
    console.log(`Server listening on http://localhost:${port}`),
  );
}
bootstrap();
