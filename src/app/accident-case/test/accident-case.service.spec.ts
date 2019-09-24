import { Test, TestingModule } from '@nestjs/testing';
import { AccidentCaseService } from '../accident-case.service';

describe('AccidentCaseService', () => {
  let service: AccidentCaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccidentCaseService],
    }).compile();

    service = module.get<AccidentCaseService>(AccidentCaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
