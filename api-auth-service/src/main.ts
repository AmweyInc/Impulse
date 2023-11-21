import { join } from 'node:path';
import { NestFactory } from '@nestjs/core';

import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { AUTH_PACKAGE_NAME } from './Auth/Auth.pb';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:50051',
        package: [AUTH_PACKAGE_NAME], // AUTHORIZATION_SERVICE_NAME
        protoPath: [
          join(__dirname, '_proto/Auth/Auth.proto'),
        ],
        loader: {
          keepCase: true,
          longs: String,
          enums: String,
          defaults: true,
          oneofs: true,
        },
      },
    }
  )

  await app.listen();

  console.log(
    'Microservice is listening',
  );
}
bootstrap();
