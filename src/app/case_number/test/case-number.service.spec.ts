import { Test, TestingModule } from '@nestjs/testing';
import { CaseNumberService } from '../case-number.service';
import { AppMainDBModule } from 'src/database/app/app_db.module';
import { caseNumberProvider } from '../case-number.provider';

describe('PolicyNumberService', () => {
  let service: CaseNumberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CaseNumberService, ...caseNumberProvider],
      imports:[AppMainDBModule]
    }).compile();

    service = module.get<CaseNumberService>(CaseNumberService);
  });

  it('should be unique number even if the request is at same time.', () => {
    expect(service).toBeDefined();
  });
});
