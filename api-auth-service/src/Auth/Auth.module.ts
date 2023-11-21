import { Module } from '@nestjs/common';
import { AuthController } from './Auth.controller';
import { AuthService } from './Auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ClientsModule } from "@nestjs/microservices";
import { grpcUserOptions } from "../config/grpc.config";
import { AuthHelper } from "./Auth.helper";

@Module({
  imports: [
    ClientsModule.register([grpcUserOptions]),
    JwtModule.registerAsync({
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          secret: configService.get('JWT.key'),
          signOptions: { expiresIn: configService.get('JWT.expiresIn') },
        }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthHelper],
})
export class AuthModule {}