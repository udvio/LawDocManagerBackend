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
        });

        const { error, value: validatedEnvConfig } = envVarsSchema.validate(
            envConfig,
        );

        if (error) {
            throw new Error(`Config validation error: ${error.message}`);
        }
        return validatedEnvConfig;
    }

    get mongoServerIP() {
        return String(this.envConfig.MONGO_SERVER_IP);
    }

    get mongoServerPort() {
        return Number(this.envConfig.MONGO_SERVER_PORT);
    }

    get mongoUserName() {
        return String(this.envConfig.MONGO_USER_NAME);
    }

    get mongoPassword() {
        return String(this.envConfig.MONGO_PASSWORD);
    }

    get appMainDBName() {
        return String(this.envConfig.APP_DATABASE_NAME);
    }
}
