import accidentCaseConfig from './accident-case.config';
import { Connection } from 'mongoose';
import { AccidentCaseSchema } from './accident-case.schema';
import app_main_dbConfig from '../database/app/app_db';
import { FactoryProvider } from '@nestjs/common/interfaces';
import { AppMainDBModule } from '../database/app/app_db.module';

export const accidentCaseProviders: FactoryProvider[] = [
    {
        provide: accidentCaseConfig.serviceToken,
        useFactory: (connection: Connection) =>
            connection.model(
                accidentCaseConfig.modelName,
                AccidentCaseSchema,
                accidentCaseConfig.collectionName,
            ),
        inject: [app_main_dbConfig.connectionName],
    },
];
