import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule, { cors: true }); // Option1: enabled 'cors'
  const app = await NestFactory.create(AppModule);
  // whitelist: true => permite el paso solo de las propiedades declaradas en el DTO sin mostar advertencia
  // forbidNonWhitelisted: true => permite el paso solo de las propiedades declaradas en el DTO mostrando una advertencia y no creando el producto
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('PLATZI STORE')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.enableCors(); // Option2: enabled 'cors' for the all sites (origins)

  /*
    app.enableCors({
      origin: ['https://www.l-trans.co', 'https://www.automecanica69.com'], // Option3: enabled 'cors' olny sites (origins) specificated
    });
  */

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
