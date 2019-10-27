import { FactoryProvider } from '@nestjs/common/interfaces';
import { personConfig } from './config/person.config';
import { Connection } from 'mongoose';
import { PersonSchema } from './schema/person.schema';
import app_db from '../../database/app/app_db';

export const personProvider: FactoryProvider[] = [
    {
        provide: personConfig.serviceToken,
        useFactory: (connection: Connection) => connection.model(personConfig.modelName, PersonSchema, personConfig.collectionName),
        inject: [app_db.connectionName],
    },
];
