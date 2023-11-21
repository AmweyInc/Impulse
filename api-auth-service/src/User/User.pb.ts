/* eslint-disable */
import { Metadata } from '@grpc/grpc-js';
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { LoginDto, RegisterDto, UserAuthDto } from '../Auth/dto/auth.dto';

export const protobufPackage: string = 'User';

export interface CreateUserRequest {
    email: string;
    password: string;
    name: string;
}

export interface GetUserResponse {
    id: number;
    email: string;
    password: string;
    name: string;
}

export interface GetUserRequest {
    email: string;
    name: string;
}

export interface ExistUserResponse {
    exist: boolean;
}

export interface CreateUserResponse {
    create: boolean;
}

export interface UpdateUserRequest {
    id: number;
}

export interface UpdateUserResponse {
    successful: boolean;
}

export const USER_PACKAGE_NAME: string = 'User';

export interface UserClient {
    createUser(request: RegisterDto, metadata?: Metadata): Observable<CreateUserResponse>;

    getUser(request: GetUserRequest, metadata?: Metadata): Observable<GetUserResponse>;

    existUser(request: GetUserRequest, metadata?: Metadata): Observable<ExistUserResponse>;

    refresh(request: UpdateUserRequest, metadata?: Metadata): Observable<UpdateUserResponse>;
}

export interface UserController {
    createUser(
        request: CreateUserRequest,
        metadata?: Metadata,
    ): Promise<CreateUserResponse> | Observable<CreateUserResponse> | CreateUserResponse;

    getUser(
        request: GetUserRequest,
        metadata?: Metadata,
        ): Promise<GetUserResponse> | Observable<GetUserResponse> | GetUserResponse;

    existUser(
        request: GetUserRequest,
        metadata?: Metadata,
    ): Promise<ExistUserResponse> | Observable<ExistUserResponse> | ExistUserResponse;

    refresh(
        request: UpdateUserRequest,
        metadata?: Metadata,
    ): Promise<UpdateUserResponse> | Observable<UpdateUserResponse> | UpdateUserResponse;
}

export function UserControllerMethods() {
    return function(constructor: Function) {
        const grpcMethods: string[] = ['refresh', 'getUser', 'existUser','createUser'];
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
