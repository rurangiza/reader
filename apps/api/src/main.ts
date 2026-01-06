import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap().catch((e) => {
  console.log(e);
  process.exit(1);
});
