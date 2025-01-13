import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();
const AppDataSource = new DataSource({
  type: 'postgres', // Database type (e.g., 'mysql', 'postgres', etc.)
  host: process.env.DATABASE_HOST || 'localhost',
  port: Number(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USERNAME || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'password',
  database: process.env.DATABASE_NAME || 'mydatabase',
  synchronize: process.env.TYPEORM_SYNC === 'true', // Should be false in production
  logging: process.env.TYPEORM_LOGGING === 'true',
  entities: [__dirname + '/**/*.entity{.ts,.js}'], // Adjust the path to your entities
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  subscribers: [__dirname + '/subscribers/*{.ts,.js}'], // Optional
});

export default AppDataSource;
