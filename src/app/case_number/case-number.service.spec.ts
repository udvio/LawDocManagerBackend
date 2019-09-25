import { Test, TestingModule } from '@nestjs/testing';
import { CaseNumberService } from './case-number.service';

describe('PolicyNumberService', () => {
  let service: CaseNumberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CaseNumberService],
    }).compile();

    service = module.get<CaseNumberService>(CaseNumberService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
