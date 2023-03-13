import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './utils/globalErrorHandler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // secure http headers
  app.use(helmet());

  // enable cors
  app.enableCors();

  // global error exception filter
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(3000);
}
bootstrap();
