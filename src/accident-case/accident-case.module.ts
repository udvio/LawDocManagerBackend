import { Module } from '@nestjs/common';
import { AccidentCaseController } from './accident-case.controller';
import { AccidentCaseService } from './accident-case.service';
import { AppMainDBModule } from '../database/AppMain/app_main_db.module';
import { accidentCaseProviders } from './accident-case.provider';

@Module({
  imports: [AppMainDBModule],
  controllers: [AccidentCaseController],
  providers: [...accidentCaseProviders, AccidentCaseService],
  exports: [AccidentCaseService, ...accidentCaseProviders],
})
export class AccidentCaseModule {}
