import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV,
  name: process.env.APP_NAME,
  url: `${process.env.APP_IP}:${process.env.APP_PORT}` || '0.0.0.0:50051',
}));
