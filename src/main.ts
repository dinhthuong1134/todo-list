import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const server = express() as any;
let isInitialized = false;

async function bootstrap() {
  if (isInitialized) return;

  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server),
  );

  app.enableCors();
  await app.init();

  isInitialized = true;
}

// ⚠️ intercept mọi request
server.use(async (req, res, next) => {
  await bootstrap();
  next();
});

export default server;
