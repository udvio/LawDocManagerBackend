import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '../../config/config.module';
import { ConfigService } from '../../config/config.service';
import app_main_dbConfig from './app_main_db.config';
import { DynamicModule } from '@nestjs/common';

export const appMainDbProvider: DynamicModule = MongooseModule.forRootAsync({
    connectionName: app_main_dbConfig.connectionName,
    imports: [ConfigModule],
    useFactory: async (config: ConfigService) => ({
        uri: `mongodb://${config.mongoServerIP}:${config.mongoServerPort}/${config.appMainDBName}`,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }),
    inject: [ConfigService],
});
