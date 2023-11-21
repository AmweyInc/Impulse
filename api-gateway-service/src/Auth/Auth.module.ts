import { Global, Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { AuthService } from './Auth.service';
import { grpcAuthOptions, grpcUserOptions } from '../config/grpc.config';
import { AuthController } from './Auth.controller';

@Global()
@Module({
  imports: [ClientsModule.register([grpcAuthOptions,grpcUserOptions])],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})

export class AuthModule {}