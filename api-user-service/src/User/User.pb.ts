/* eslint-disable */
import { Metadata } from '@grpc/grpc-js';
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export const protobufPackage: string = 'User';

export interface CreateUserRequest {
    email: string;
    password: string;
    name: string;
}

export interface CreateUserResponse {
    email: string;
    password: string;
    name: string;
}

export interface GetUserResponse {
    email: string;
    password: string;
    name: string;
}

export interface GetUserRequest {
    email: string;
    name: string;
}

export const USER_PACKAGE_NAME: string = 'User';

export interface UserClient {
    signUp(request: CreateUserRequest, metadata?: Metadata): Observable<CreateUserResponse>;

    signIn(request: GetUserResponse, metadata?: Metadata): Observable<GetUserResponse>;

    // refresh(request: string, metadata?: Metadata): Observable<string | never>;

    hello(RegisterDto: string): Observable<string>;
}

export interface UserController {
    createUser(
        request: CreateUserRequest,
        metadata?: Metadata,
    ): Promise<CreateUserResponse> | Observable<CreateUserResponse> | CreateUserResponse;

    signIn(
        request: GetUserRequest,
        metadata?: Metadata,
    ): Promise<GetUserResponse> | Observable<GetUserResponse> | GetUserResponse;

    // refresh(
    //     request: AuthorizationToken,
    //     metadata?: Metadata,
    // ): Promise<VerifyResponse> | Observable<VerifyResponse> | VerifyResponse;

    hello(RegisterDto: string): Observable<string>;
}

export function UserControllerMethods() {
    return function(constructor: Function) {
        const grpcMethods: string[] = ['signUp', 'signIn', 'hello'];
        for (const method of grpcMethods) {
            const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
            GrpcMethod('User', method)(constructor.prototype[method], method, descriptor);
        }

        const grpcStreamMethods: string[] = [];
        for (const method of grpcStreamMethods) {
            const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
            GrpcStreamMethod('User', method)(constructor.prototype[method], method, descriptor);
        }
    };
}

export const USER_SERVICE_NAME: string = 'UserService';
