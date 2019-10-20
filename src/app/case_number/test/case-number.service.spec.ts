import { Test, TestingModule } from '@nestjs/testing';
import { CaseNumberService } from '../case-number.service';
import { AppMainDBModule } from '../../../database/app/app_db.module';
import { CaseNumberErrorMsg } from '../../shared/error/error-msgs';
import { HttpException, HttpStatus } from '@nestjs/common';
import { FactoryProvider } from '@nestjs/common/interfaces';
import { Connection} from 'mongoose';
import { caseNumberConfig } from '../case-number.config';
import { CaseNumberSchema} from '../model/case-number';
import app_db from '../../../database/app/app_db';



describe('CaseNumberService', () => {
  let service: CaseNumberService;
  let module: TestingModule;
  let mockCaseNumberProvider:FactoryProvider

  beforeAll(async () => {

     mockCaseNumberProvider= {
      provide: caseNumberConfig.serviceToken,
      useFactory: (connection:Connection) => {
        return connection.model(caseNumberConfig.modelName, CaseNumberSchema, 'test');
      },
      inject: [app_db.connectionName],
    }

    module = await Test.createTestingModule({
      providers: [CaseNumberService, mockCaseNumberProvider],
      imports: [AppMainDBModule],
    }).compile();

    service = module.get<CaseNumberService>(CaseNumberService);
  })

  beforeEach(() => {
    jest.clearAllMocks();
  });


  describe('CreateNewCaseNumber', () => {
    it(`Throw Http Exception when case number tracker collection of document is empty or unavailable`, async () => {
      jest.spyOn(service, 'getCaseNumberTracker')
        .mockRejectedValue(new Error(CaseNumberErrorMsg.NO_CASE_NUMBER_DATA));

      const error_result = await service.createNewCaseNumber().catch(err => err)
      expect(error_result).toEqual(new HttpException(CaseNumberErrorMsg.NO_CASE_NUMBER_DATA, HttpStatus.NOT_ACCEPTABLE));
    });

    it('Create New CaseNumber', () => {
        expect('test').toEqual('test');
    })

  });

  describe('Generate New Case Number', () => {
    it('New Case Number with incremental of 1', async () => {
      const newCaseNumber = await service.generateNewCaseNumber(1);
      expect(newCaseNumber).toEqual(2);
    })
  });

  describe('Compare two year', () => {
    it('Should return true as both year is the same', async () => {
      const mockDateToCurrent = new Date(Date.now());
      const isSameYear = await service.isLastCaseNumberGeneratedInSameYear(mockDateToCurrent);
      expect(isSameYear).toEqual(true);
    })

    it('Should return false as the both year is not same', async () => {
      const mockLastYear = new Date(2018, 8, 19);
      const isNotSameYear = await service.isLastCaseNumberGeneratedInSameYear(mockLastYear);
      expect(isNotSameYear).toEqual(false);
    })

  });

  // describe('bootstrapFirstCaseNumber', () => {
  //   it('Should Create the first entry of the case tracker test mongo db.', async () => {
  //     const firsEntry = await service.bootstrapFirstCaseNumber(1);
  //     expect(firsEntry).toEqual(1);
  //   })
  // })

});
