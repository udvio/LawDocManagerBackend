import { Test, TestingModule } from '@nestjs/testing';
import { CaseNumberController } from '../case-number.controller';
import { AppMainDBModule } from '../../../database/app/app_db.module';
import { CaseNumberService } from '../case-number.service';
import { caseNumberProvider } from '../case-number.provider';

describe('CaseNumber Controller', () => {
  let controller: CaseNumberController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CaseNumberController],
      imports:[AppMainDBModule],
      providers:[CaseNumberService, ...caseNumberProvider]
    }).compile();

    controller = module.get<CaseNumberController>(CaseNumberController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
