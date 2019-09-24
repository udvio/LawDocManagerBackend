import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as Joi from '@hapi/joi';

export interface EnvConfig {
  [key: string]: string;
}

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);
  }

  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      APP_ENV: Joi.string()
        .valid('development', 'production', 'test', 'provision')
        .default('development'),
      MONGO_SERVER_IP: Joi.string().default('localhost'),
      MONGO_SERVER_PORT: Joi.number().default(27017),
      MONGO_USER_NAME: Joi.string(),
      MONGO_PASSWORD: Joi.string(),
      APP_DATABASE_NAME: Joi.string(),
      MINIO_SERVER_IP: Joi.string().default('localhost'),
      MINIO_SERVER_PORT: Joi.number().default(9000),
      MINIO_SERVER_SECRET: Joi.string(),
      MINIO_SERVER_ACCESS_KEY: Joi.string(),
    });

    const { error, value: validatedEnvConfig } = envVarsSchema.validate(
      envConfig,
    );

    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  get mongoServerIP(): string {
    return String(this.envConfig.MONGO_SERVER_IP);
  }

  get mongoServerPort(): number {
    return Number(this.envConfig.MONGO_SERVER_PORT);
  }

  get mongoUserName(): string {
    return String(this.envConfig.MONGO_USER_NAME);
  }

  get mongoPassword(): string {
    return String(this.envConfig.MONGO_PASSWORD);
  }

  get appMainDBName(): string {
    return String(this.envConfig.APP_DATABASE_NAME);
  }

  get minioIP(): string {
    return String(this.envConfig.MINIO_SERVER_IP);
  }

  get minioPort(): number {
    return Number(this.envConfig.MINIO_SERVER_PORT);
  }

  get minioSecret(): string {
    return String(this.envConfig.MINIO_SERVER_SECRET);
  }

  get minioAccessKey(): string {
    return String(this.envConfig.MINIO_SERVER_ACCESS_KEY);
  }
}
