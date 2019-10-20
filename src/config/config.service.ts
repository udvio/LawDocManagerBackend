import { Injectable, Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as Joi from '@hapi/joi';
import { join } from 'path';

export interface EnvConfig {
  [key: string]: string;
}

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;
  private readonly context: string;

  constructor(private readonly ENVIRONMENT: string) {
    this.context = 'ConfigService';
    const envFilePath: string = this.getEnvFilePath(ENVIRONMENT);
    const config = dotenv.parse(fs.readFileSync(envFilePath));
    this.envConfig = this.validateInput(config);
  }

  private getEnvFilePath(ENV: string): string {
    const envDir: string = 'environment';
    return join(process.cwd(),envDir,`${ENV}.env`);
  }

  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      APP_ENV: Joi.string()
        .valid('development', 'production', 'test', 'provision')
        .default('development'),
      VERSION: Joi.string(),
      SERVER_PORT: Joi.number().default(3000),
      MONGO_SERVER_IP: Joi.string().default('localhost'),
      MONGO_SERVER_PORT: Joi.number().default(27017),
      MONGO_INITDB_ROOT_USERNAME: Joi.string(),
      MONGO_INITDB_ROOT_PASSWORD: Joi.string(),
      MONGO_DB_AUTH_SOURCE: Joi.string(),
      APP_DATABASE_NAME: Joi.string(),
      MINIO_SERVER_IP: Joi.string().default('localhost'),
      MINIO_SERVER_PORT: Joi.number().default(9000),
      MINIO_SECRET_KEY: Joi.string(),
      MINIO_ACCESS_KEY: Joi.string(),
    });

    const { error, value: validatedEnvConfig } = envVarsSchema.validate(
      envConfig,
    );

    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  get environment(): string {
    return String(this.envConfig.APP_ENV);
  }

  get appVersion(): string {
    return String(this.envConfig.VERSION);
  }

  get serverPort(): number {
    const port: number = Number(this.envConfig.SERVER_PORT);
    return port;
  }

  get mongoServerIP(): string {
    const mServerIP: string = String(this.envConfig.MONGO_SERVER_IP);
    Logger.debug(`Server Mongo IP: ${mServerIP}`, this.context);
    return mServerIP;
  }

  get mongoServerPort(): number {
    const mServerPort: number = Number(this.envConfig.MONGO_SERVER_PORT);
    Logger.debug(`Server Mongo IP: ${mServerPort}`, this.context);
    return mServerPort;
  }

  get mongoUserName(): string {
    return String(this.envConfig.MONGO_INITDB_ROOT_USERNAME);
  }

  get mongoPassword(): string {
    return String(this.envConfig.MONGO_INITDB_ROOT_PASSWORD);
  }

  get mongoAuthSource(): string {
    const mAuthSource: string = String(this.envConfig.MONGO_DB_AUTH_SOURCE);
    Logger.debug(`Mongo Auth Source : ${mAuthSource}`, this.context);
    return mAuthSource;
  }

  get appMainDBName(): string {
    return String(this.envConfig.APP_DATABASE_NAME);
  }

  get minioIP(): string {
    const IP = String(this.envConfig.MINIO_SERVER_IP);
    Logger.debug(`Minio Server IP : ${IP}`, this.context);
    return IP;
  }

  get minioPort(): number {
    const port = Number(this.envConfig.MINIO_SERVER_PORT);
    Logger.debug(`Minio Server Port : ${port}`, this.context);
    return port;
  }

  get minioSecret(): string {
    return String(this.envConfig.MINIO_SECRET_KEY);
  }

  get minioAccessKey(): string {
    return String(this.envConfig.MINIO_ACCESS_KEY);
  }
}
