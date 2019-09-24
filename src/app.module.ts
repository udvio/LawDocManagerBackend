import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccidentCaseModule } from './accident-case/accident-case.module';
import { AppMainDBModule } from './database/AppMain/app_main_db.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [ConfigModule, AppMainDBModule, AccidentCaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
