import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  DATABASE_URL: process.env.DATABASE_URL,
  DATABASE_TYPE: process.env.DATABASE_TYPE,
  DATABASE_HOST: process.env.DATABASE_HOST,
  DATABASE_PORT: Number.parseInt(process.env.DATABASE_PORT, 10) || 5432,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_NAME: process.env.DATABASE_NAME,
  DATABASE_USERNAME: process.env.DATABASE_USERNAME,
  DATABASE_SYNCHRONIZE: process.env.DATABASE_SYNCHRONIZE,
}));
