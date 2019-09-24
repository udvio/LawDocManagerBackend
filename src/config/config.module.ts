import 'dotenv/config';
import { Module, Global } from '@nestjs/common';
import { ConfigService } from './config.service';
@Global()
@Module({
  providers: [{
    provide : ConfigService,
    useValue: new ConfigService(`${process.env.APP_ENV || 'development'}.env`),
  }],
  exports: [ConfigService],
})
export class ConfigModule {}
