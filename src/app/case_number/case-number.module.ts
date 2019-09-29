import { Module } from '@nestjs/common';
import { CaseNumberService } from './case-number.service';
import { caseNumberProvider } from './case-number.provider';
import { AppMainDBModule } from '../../database/app/app_db.module';
import { CaseNumberController } from './case-number.controller';

@Module({
  controllers: [CaseNumberController],
  providers: [CaseNumberService,...caseNumberProvider],
  imports:[AppMainDBModule],
})
export class CaseNumberModule {}
