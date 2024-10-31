import { DataSource } from 'typeorm';
import { Task } from './entities/Task';
import { User } from './entities/User';
import { Category } from './entities/Category';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  entities: [Task, User, Category],
  migrations: ['dist/migrations/*.js'],
});
