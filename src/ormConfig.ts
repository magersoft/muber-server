import { ConnectionOptions } from 'typeorm';

const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  database: 'muber',
  synchronize: true,
  logging: true,
  entities: ['entities/**/*.*'],
  host: process.env.DB_ENDPOINT || 'localhost',
  port: 5432,
  username: process.env.DB_USERNAME || 'v.mager',
  password: process.env.DB_PASSWORD || ''
};

export default connectionOptions;
