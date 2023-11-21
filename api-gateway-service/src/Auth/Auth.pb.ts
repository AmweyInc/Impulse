import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { LoginDto, RegisterDto, UserAuthDto } from './dto/auth.dto';

export const protobufPackage = "auth";

export interface Environment {
  env: string;
}

export interface AuthorizationLink {
  link: string;
}

export interface AuthorizationToken {
  token: string;
}

export interface VerifyResponse {
  isValid: boolean;
}

export interface SingInRequest {
  code: string;
  env: string;
}

export const AUTH_PACKAGE_NAME:string = "Authorization";

export interface AuthorizationClient {
  signUp(request: RegisterDto, metadata?: Metadata): Observable<UserAuthDto>;

  signIn(request: LoginDto, metadata?: Metadata): Observable<string | never>;

  refresh(request: { token: string }, metadata?: Metadata): Observable<AuthorizationToken>;
}

export interface AuthorizationController {
  signUp(
      request: Environment,
      metadata?: Metadata,
  ): Promise<AuthorizationLink> | Observable<AuthorizationLink> | AuthorizationLink;

  signIn(
      request: SingInRequest,
      metadata?: Metadata,
  ): Promise<AuthorizationToken> | Observable<AuthorizationToken> | AuthorizationToken;

  refresh(
      request: AuthorizationToken,
      metadata?: Metadata,
  ): Promise<AuthorizationToken> | Observable<AuthorizationToken> | AuthorizationToken;
}

export function AuthorizationControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["signUp", "signIn", "refresh"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("Authorization", method)(constructor.prototype[method], method, descriptor);
    }

    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("Authorization", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const AUTHORIZATION_SERVICE_NAME = "AuthorizationService";
