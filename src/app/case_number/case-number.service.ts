import { Injectable, Inject, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { caseNumberConfig } from './case-number.config';
import { Model } from 'mongoose';
import { NumberTrackerDocument, CaseNumber } from './model/case-number';
import AsyncLock = require('async-lock');
// Case Number service enable the generating unique counter for case number
// 1. The case number start by 1 and increment by 1 after each casenumber is been generated
// 2 .The case number also should start from 1 on first query made if the in every new year.

@Injectable()
export class CaseNumberService {
    caseNumber: number;
    lock = new AsyncLock()

    constructor(@Inject(caseNumberConfig.serviceToken) private readonly caseNumberRepo: Model<NumberTrackerDocument>) { }

    async createNewCaseNumber(): Promise<number> {

        return this
            .lock.acquire(this.createNewCaseNumber.name, () =>

                this.caseNumberRepo.findById({ _id: caseNumberConfig.constantId })

                    .then(async caseTracker => {
                        if (caseTracker === null || caseTracker === undefined) {
                            const firstCase: CaseNumber = {
                                _id: caseNumberConfig.constantId,
                                caseNumber: 1
                            };
                            const savedCaseNumber = await new this.caseNumberRepo(firstCase).save();
                            return savedCaseNumber.caseNumber;
                        }

                        else {
                            const newCaseNumber = caseTracker.caseNumber + 1;

                            Logger.debug(`New Counter ${newCaseNumber}`,
                                `${CaseNumberService.name}::${this.createNewCaseNumber.name}`);

                            await this.caseNumberRepo
                                .updateOne({ _id: caseNumberConfig.constantId }, { caseNumber: newCaseNumber })
                                .then(_updateSuccessful => {
                                    return newCaseNumber;
                                })


                        }
                    }).catch(err => {

                        Logger
                            .error(`Fail to update caseNumber in Database ERR_MSG -> ${JSON.stringify(err)}`,
                                `${err}`,
                                `${CaseNumberService.name}::${this.createNewCaseNumber.name}`)

                        throw new HttpException('Faile to create new case number successfully', HttpStatus.EXPECTATION_FAILED);
                    }))
            .then(caseNumber => caseNumber)
    }

}
