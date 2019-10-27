import { ConfigService } from '../../config/config.service';
import app_main_dbConfig from './app_db';
import * as mongoose from 'mongoose';
import { Logger, HttpException } from '@nestjs/common';
import { FactoryProvider } from '@nestjs/common/interfaces';

export const appDBProvider:FactoryProvider[] = [
  {
    provide: app_main_dbConfig.connectionName,
    useFactory: async (config: ConfigService): Promise<mongoose.Connection> => {
      return await mongoose.createConnection(
        `mongodb://${config.mongoServerIP}:${config.mongoServerPort}/${config.appMainDBName}`,
        {
          auth:{
            user:config.mongoUserName,
            password:config.mongoPassword,
          },
          numberOfRetries: 5,
          autoReconnect:true,
          authSource: config.mongoAuthSource,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
      ).then(_connection => {
        Logger.debug(`Connection to Database ${config.appMainDBName} was successful`,`appDBProvider`);
        return _connection;
      }).catch(_err => {
        Logger.error(`Unable to connect to database ${config.appMainDBName}`,`appDBProvider`);
        throw Error(`Unable to connect to database ${config.appMainDBName}`);
      });
    },
    inject: [ConfigService],
  },
];
