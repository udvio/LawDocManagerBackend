import { Module } from '@nestjs/common';
import { AccidentCaseController } from './accident-case.controller';
import { AccidentCaseService } from './accident-case.service';
import { AppMainDBModule } from '../database/app/app_db.module';
import { accidentCaseProviders } from './accident-case.provider';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [AppMainDBModule],
  controllers: [AccidentCaseController],
  providers: [AccidentCaseService, ...accidentCaseProviders],
  exports: [AccidentCaseService, ...accidentCaseProviders],
})
export class AccidentCaseModule {}
