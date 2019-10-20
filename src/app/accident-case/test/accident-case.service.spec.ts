import { Test, TestingModule } from '@nestjs/testing';
import { AccidentCaseService } from '../accident-case.service';
import { AppMainDBModule } from '../../../database/app/app_db.module';
import { accidentCaseProviders } from '../accident-case.provider';
import {} from 'mockingoose';

describe('AccidentCaseService', () => {
  let service: AccidentCaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccidentCaseService,...accidentCaseProviders],
      imports:[AppMainDBModule],
    }).compile();

    service = module.get<AccidentCaseService>(AccidentCaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
