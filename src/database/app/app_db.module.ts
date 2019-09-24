import { Module} from '@nestjs/common';
import { testProvider } from './app_db.provider';
import { ConfigModule } from '../../config/config.module';

@Module({
    imports: [ConfigModule],
    providers: [...testProvider],
    exports: [...testProvider],
})
export class AppMainDBModule {}
