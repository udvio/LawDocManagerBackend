import { Injectable, Inject, Logger } from '@nestjs/common';
import { caseNumberConfig } from './case-number.config';
import { Model} from 'mongoose';
import { NumberTrackerDocument, CaseNumber } from './model/case-number';
import AsyncLock = require('async-lock');
// Case Number service enable the generating unique counter for case number
// 1. The case number start by 1 and increment by 1 after each casenumber is been generated
// 2 .The case number also should start from 1 on first query made if the in every new year.

@Injectable()
export class CaseNumberService {
    caseNumber: number;
    lock = new AsyncLock()

    constructor(@Inject(caseNumberConfig.serviceToken) private readonly caseNumberRepo:Model<NumberTrackerDocument>) {}

    async createNewCaseNumber():Promise<number> {
        if(this.lock.isBusy(this.createNewCaseNumber.name)){
            console.log('lockActivated');
        }
        return this.lock.acquire(this.createNewCaseNumber.name, ()=> this.caseNumberRepo.findById({ _id: caseNumberConfig.constantId })
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
                    Logger.debug(`New Counter ${newCaseNumber}`, `${CaseNumberService.name}::${this.createNewCaseNumber.name}`);
                    const _ = await this.caseNumberRepo.updateOne({ _id: caseNumberConfig.constantId }, { caseNumber: newCaseNumber });
                    return newCaseNumber;
                }
            })).then(caseNumber => caseNumber)
    }
}
