import { resolve } from 'node:path';
import { ClientProviderOptions, Transport } from '@nestjs/microservices';
import { AUTH_PACKAGE_NAME, AUTHORIZATION_SERVICE_NAME, protobufPackage } from '../Auth/Auth.pb';
import {USER_PACKAGE_NAME, USER_SERVICE_NAME} from "../User/User.pb";

export const grpcAuthOptions = {
  name: AUTHORIZATION_SERVICE_NAME,
  transport: Transport.GRPC,
  options: {
    url: process.env.GRPC_AUTH_SERVICE_HOST || '0.0.0.0:50051',
    package: [AUTH_PACKAGE_NAME],
    protoPath: [
      resolve(__dirname, '../_proto/Auth/Auth.proto'),
    ],
    loader: {
      keepCase: true,
      longs: String,
      defaults: true,
      oneofs: true,
    },
  },
} as ClientProviderOptions;

export const grpcUserOptions = {
  name: USER_SERVICE_NAME,
  transport: Transport.GRPC,
  options: {
    url: process.env.GRPC_USER_SERVICE_HOST || '0.0.0.0:50052',
    package: [USER_PACKAGE_NAME],
    protoPath: [
      resolve(__dirname, '../_proto/User/User.proto'),
    ],
    loader: {
      keepCase: true,
      longs: String,
      defaults: true,
      oneofs: true,
    },
  },
} as ClientProviderOptions;