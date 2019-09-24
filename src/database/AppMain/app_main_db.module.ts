import { Module} from '@nestjs/common';
import { appMainDbProvider } from './app_main_db.provider';

@Module({
    imports: [appMainDbProvider],
    providers:[],
    exports: [appMainDbProvider],
})
export class AppMainDBModule {}
