import { PrismaClientDatabase } from '@database/client';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { InputValidationError } from './errors/InputValidationError';

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'https://series-diary.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const result = errors.map((error) => {
          return new InputValidationError(
            error.constraints[Object.keys(error.constraints)[0]],
          );
        });

        return result[0];
      },
      stopAtFirstError: true,
    }),
  );
  await app.listen(PORT);
}

bootstrap().then(async () => {
  console.log(`Server started on http://localhost:${PORT}`);

  const databaseClient = new PrismaClientDatabase();

  await databaseClient.connect();
});
