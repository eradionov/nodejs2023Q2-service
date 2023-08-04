import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as process from 'process';
dotenv.config();
export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'postgresql',
        port: parseInt(process.env['PG_PORT']),
        username: process.env['PG_USER'],
        password: process.env['PG_PASSWORD'],
        database: process.env['PG_DB'],
        entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
