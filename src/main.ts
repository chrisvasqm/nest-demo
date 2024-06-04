import 'dotenv/config';
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(helmet());

  const port = process.env.PORT || 3000;
  await app.listen(port, () =>
    console.log(`Server listening on http://localhost:${port}`),
  );
}
bootstrap();
