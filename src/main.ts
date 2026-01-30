import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const server = express() as any;

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server),
  );

  app.enableCors();

  // await app.listen(3000);
  await app.init();
  return app.getHttpAdapter().getInstance();
}

bootstrap();

// export default server;

export default async (req: any, res: any) => {
  const instance = await bootstrap();
  instance(req, res);
};
