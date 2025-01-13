import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { useContainer } from 'class-validator';
import { join } from 'path';
import * as express from 'express';
dotenv.config({
  path: '.env',
});
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set global prefix for all routes
  app.setGlobalPrefix('api/v1');
  // Configure class-validator to use the NestJS container
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  // Enable CORS with specific configuration
  app.enableCors({
    origin: process.env.CLIENT_ORIGIN ?? '*', // Update with specific client URL for security
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  // Set up global validation pipe with class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove non-whitelisted properties
      forbidNonWhitelisted: true, // Throw error for non-whitelisted properties
      transform: true, // Automatically transform payloads to DTO classes
      transformOptions: {
        enableImplicitConversion: true, // Enable implicit type conversion
      },
    }),
  );

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle(process.env.SWAGGER_TITLE)
    .setDescription(process.env.SWAGGER_DESCRIPTION)
    .setVersion(process.env.SWAGGER_VERSION)
    .addTag(process.env.SWAGGER_TAG)
    .addBearerAuth(
      {
        type: 'http' as const,
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter your JWT token',
      },
      'JWT-auth',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(process.env.SWAGGER_DOCS, app, document);

  // Start the server
  const port = process.env.API_PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(
    `Swagger documentation is available on: http://localhost:${port}/api/docs`,
  );
}

bootstrap();
