import { Connection } from 'mongoose';
import { AccidentCaseSchema } from './schema/accident-case.schema';
import { FactoryProvider } from '@nestjs/common/interfaces';
import { accidentCaseConfig } from './config/accident-case.config';
import app_db from '../../database/app/app_db';

export const accidentCaseProviders: FactoryProvider[] = [
    {
        provide: accidentCaseConfig.serviceToken,
        useFactory: (connection: Connection) =>
            connection.model(
                accidentCaseConfig.modelName,
                AccidentCaseSchema,
                accidentCaseConfig.collectionName,
            ),
        inject: [app_db.connectionName],
    },
];
