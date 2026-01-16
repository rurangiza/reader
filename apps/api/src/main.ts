import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: false,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Reader')
    .setDescription('The Reader API')
    .setVersion('1.0')
    .addGlobalResponse({
      description: 'Internal server error',
      status: 500,
    })
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  app.use(cookieParser());

  app.enableCors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'], // TODO: add to environment vars
  });

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap().catch((e) => {
  console.log(e);
  process.exit(1);
});
