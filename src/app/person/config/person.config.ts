import { MongoAppConfig } from '../../shared/interface/config.interface';

export const personConfig: MongoAppConfig = {
    serviceToken: 'PersonService',
    modelName: 'IPerson',
    collectionName: 'person',
};

export default personConfig;
