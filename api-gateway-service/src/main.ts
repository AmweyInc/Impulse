import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { IoAdapter } from '@nestjs/platform-socket.io';
import fastifyHelmet from '@fastify/helmet';
import { AppModule } from './app.module';


const CorsOptions = {
  origin: '*',
  allowedHeaders: [
    'Access-Control-Allow-Origin',
    'Origin',
    'X-Requested-With',
    'Accept',
    'Content-Type',
    'Authorization',
  ],
  credentials: true,
  methods: ['GET', 'PUT', 'PATCH', 'OPTIONS', 'POST', 'DELETE'],
};

async function bootstrap() {
  const adapter = new FastifyAdapter();
  adapter.enableCors(CorsOptions);

  // @ts-ignore
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    adapter,
    {
      bufferLogs: true,
    },
  );

  // @ts-ignore
  app.useWebSocketAdapter(new IoAdapter(app));


  await app.register(fastifyHelmet);

  // @ts-ignore
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // @ts-ignore
  app.setGlobalPrefix('api/v1');

  const port:number = 7000;
  await app.listen(port);

  console.log(
    `[Api Gateway] Listening on port ${port}`,
  );
}

bootstrap();
