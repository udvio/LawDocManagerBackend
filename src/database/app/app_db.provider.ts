import { ConfigService } from '../../config/config.service';
import app_main_dbConfig from './app_db';
import * as mongoose from 'mongoose';

export const testProvider = [
  {
    provide: app_main_dbConfig.connectionName,
    useFactory: async (config: ConfigService): Promise<typeof mongoose> => {
      return await mongoose.connect(
        `mongodb://${config.mongoServerIP}:${config.mongoServerPort}/${config.appMainDBName}`,
        {
          user: config.mongoUserName,
          pass: config.mongoPassword,
          authSource: config.mongoAuthSource,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
      );
    },
    inject: [ConfigService],
  },
];
