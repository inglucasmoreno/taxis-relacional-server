import { DynamicModule } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Environment } from "src/common/enum";

export const DatabaseProvider: DynamicModule = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  async useFactory(config: ConfigService): Promise<any>{
    // const isDevelopmentEnv = config.get("NODE_ENV") !== Environment.Production;
    const isDevelopmentEnv = config.get("NODE_ENV") !== 'production';
    const dbConfig = {
      type: 'postgres',
      host: config.get("DB_HOST"),
      port: +config.get("DB_PORT"),
      username: config.get("DB_USER"),
      password: config.get("DB_PASSWORD"),
      database: config.get("DB_NAME"),
      autoLoadEntities: true,
      synchronize: isDevelopmentEnv, // Quitar en produccion
      logging: config.get("DB_LOGGIN"),
      // migrationsTableName: "migrations",
      // migrations: ["src/database/migrations/*.ts"],
      // cli: {
      //   migrationsDir: "src/database/migrations"
      // }
    }

    return dbConfig;

  }
})