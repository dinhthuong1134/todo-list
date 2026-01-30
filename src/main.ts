import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

// Tạo biến global để cache instance của NestJS
let cachedServer: any;

async function bootstrap() {
  if (!cachedServer) {
    const server = express();
    const app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(server),
    );

    app.enableCors();
    await app.init();
    
    // Lưu instance vào cache để dùng cho lần sau
    cachedServer = server;
  }
  return cachedServer;
}

// Export duy nhất một function cho Vercel
export default async (req: any, res: any) => {
  const instance = await bootstrap();
  return instance(req, res);
};