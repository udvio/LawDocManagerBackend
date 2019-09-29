import { Test, TestingModule } from '@nestjs/testing';
import { CaseNumberController } from '../case-number.controller';

describe('CaseNumber Controller', () => {
  let controller: CaseNumberController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CaseNumberController],
    }).compile();

    controller = module.get<CaseNumberController>(CaseNumberController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
