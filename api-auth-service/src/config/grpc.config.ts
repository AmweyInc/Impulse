import { resolve } from 'node:path';
import { ClientProviderOptions, Transport } from '@nestjs/microservices';
import { USER_PACKAGE_NAME, USER_SERVICE_NAME } from "../User/User.pb";

export const grpcUserOptions = {
  name: USER_SERVICE_NAME,
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:50052',
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