import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  host: "0.0.0.0",
  port: 5432,
  username: "mtadmin",
  password: "mtpassword",
  database: "majestictrade",
  synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
  dropSchema: false,
  keepConnectionAlive: true,
  logging: process.env.DATABASE_LOGGING === 'true',
  entities: [`${__dirname}/../**/Entities/*.entity{.ts,.js}`],
  migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
  migrationsRun: true,
  cli: {
    entitiesDir: 'src/**/Entities/',
    migrationsDir: 'src/database/migrations',
    subscribersDir: 'subscriber',
  },
} as DataSourceOptions);
export default AppDataSource;