import "reflect-metadata";
import "dotenv/config";
import { DataSource, DataSourceOptions } from "typeorm";
import path from "path";

const dataSourceConfig = (): DataSourceOptions => {

    const entitiesPath = path.join(__dirname, "/entities/**.{ts,js}");
    const migrationsPath = path.join(__dirname, "/migrations/**.{ts,js}");

    const dbUrl = process.env.DATABASE_URL;

    if (!dbUrl) {
        throw new Error("Missing env var: DATABASE_URL");
    }

    const nodeEnv: string | undefined = process.env.NODE_ENV;

    if(nodeEnv === "test") {
        return {
            type: "sqlite",
            database: ":memory:",
            synchronize: true,
            entities: [ entitiesPath ],
        }
    }

    return {
        type: "postgres",
        url: dbUrl,
        logging: true,
        entities: [entitiesPath],
        migrations: [migrationsPath]
    }
};

export const AppDataSource: DataSource = new DataSource(dataSourceConfig());