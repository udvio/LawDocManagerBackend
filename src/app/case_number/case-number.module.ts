import { Module } from '@nestjs/common';
import { CaseNumberService } from './case-number.service';

@Module({
  providers: [CaseNumberService],
})
export class CaseNumberModule {}
