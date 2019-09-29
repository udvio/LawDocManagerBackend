import { Module} from '@nestjs/common';
import { appDBProvider } from './app_db.provider';
import { ConfigModule } from '../../config/config.module';

@Module({
    imports: [ConfigModule],
    providers: [...appDBProvider],
    exports: [...appDBProvider],
})
export class AppMainDBModule {}
