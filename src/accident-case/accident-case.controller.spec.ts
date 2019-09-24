import { Test, TestingModule } from '@nestjs/testing';
import { AccidentCaseController } from './accident-case.controller';

describe('AccidentCase Controller', () => {
  let controller: AccidentCaseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccidentCaseController],
    }).compile();

    controller = module.get<AccidentCaseController>(AccidentCaseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
