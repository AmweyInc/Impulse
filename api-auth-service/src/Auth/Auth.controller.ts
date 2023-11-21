import { Controller, UseFilters } from '@nestjs/common';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { GrpcMethod } from '@nestjs/microservices';
import { AuthService } from './Auth.service';
import { AUTHORIZATION_SERVICE_NAME } from './Auth.pb';
import { RpcExceptionFilter } from '../utils/exceptions';
import { CreateUserResponse } from "../User/User.pb";
import { UserAuthResponse } from "./dto/auth.dto";

@Controller()
export class AuthController {
  constructor(private AuthService: AuthService) {
  }

  @GrpcMethod(AUTHORIZATION_SERVICE_NAME, 'SignUp')
  @UseFilters(RpcExceptionFilter.for('AuthController::signUp'))
  async signUp(data: any, metadata: Metadata, call: ServerUnaryCall<any, any>): Promise<boolean> {
    return this.AuthService.signUp(data);
  }

  @GrpcMethod(AUTHORIZATION_SERVICE_NAME, 'SignIn')
  @UseFilters(RpcExceptionFilter.for('AuthController::signIn'))
  async signIn(data: any, metadata: Metadata, call: ServerUnaryCall<any, any>): Promise<UserAuthResponse> {
    return this.AuthService.signIn(data);
  }

  @GrpcMethod(AUTHORIZATION_SERVICE_NAME, 'refresh')
  @UseFilters(RpcExceptionFilter.for('AuthController::refresh'))
  async refresh(data: any, metadata: Metadata, call: ServerUnaryCall<any, any>): Promise<UserAuthResponse> {
    return this.AuthService.refresh(data);
  }
}