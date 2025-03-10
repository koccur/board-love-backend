import "reflect-metadata"
import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions:DataSourceOptions = {
    type: 'postgres',
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "admin666ADMIN123",
    database: "boardlove_db",
    entities: ["build/**/*.entity.js}"],
    migrations: ['src/migrations/*.ts'],
    synchronize: true, // ❌ Disable in production
    logging: true,
};

const dataSource = new DataSource(dataSourceOptions)
export default dataSource;