import { Injectable, Inject, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { caseNumberConfig } from './case-number.config';
import { Model } from 'mongoose';
import { caseNumberTrackerMongooseDocument, CaseNumber } from './model/case-number';
import AsyncLock = require('async-lock');
import { CaseNumberErrorMsg } from '../shared/error/error-msgs';
import { threadId } from 'worker_threads';
// Case Number service enable the generating unique counter for case number
// 1. The case number start by 1 and increment by 1 after each casenumber is been generated
// 2 .The case number also should start from 1 on first query made if the in every new year.

@Injectable()
export class CaseNumberService {
    caseNumber: number;
    lock = new AsyncLock()

    constructor(
        @Inject(caseNumberConfig.serviceToken)
        private readonly caseNumberRepo: Model<caseNumberTrackerMongooseDocument>
    ) { }

    async createNewCaseNumber(): Promise<number> {
        const context = `${CaseNumberService.name}::${this.createNewCaseNumber.name}`;

        if (this.lock.isBusy(this.createNewCaseNumber.name)) {
            console.log('lockActivated');
        }


        return await this.lock
            .acquire(this.createNewCaseNumber.name,
                () => this.getCaseNumberTracker()
                    .then( caseNumberTracker => {
                        return this.isLastCaseNumberGeneratedInSameYear(new Date(caseNumberTracker.updatedAt))
                            .then(isSameYear => {
                                if (isSameYear) {
                                    return this.generateNewCaseNumber(caseNumberTracker.caseNumber).then(newCaseNumber => newCaseNumber);
                                } else {
                                    const zeroCaseNumberOfTheYear = 0
                                    return this.generateNewCaseNumber(zeroCaseNumberOfTheYear).then(newCaseNumber => newCaseNumber);
                                }
                            })
                    }).catch((_noCaseTracker: Error) => {
                        throw new HttpException(_noCaseTracker.message,HttpStatus.NOT_ACCEPTABLE);
                    }));
    }

    async getCaseNumberTracker(): Promise<caseNumberTrackerMongooseDocument> {
        const context = `${CaseNumberService.name}::${this.getCaseNumberTracker.name}`
        return await this.caseNumberRepo.findById({ _id: caseNumberConfig.constantId }).exec().then(caseNumberTracker => {
            if (caseNumberTracker === null || caseNumberTracker === undefined) {
                Logger.error(`Error,No Case Tracker`, `Collection ${caseNumberConfig.collectionName} is empty`, context, false)
                throw new Error(CaseNumberErrorMsg.NO_CASE_NUMBER_DATA);
            } else {
                return caseNumberTracker
            }
        });
    }

    async generateNewCaseNumber(currentcaseNumber: number): Promise<number> {
        const context = `${CaseNumberService.name}::${this.generateNewCaseNumber.name}}`
        const newCaseNumber = currentcaseNumber + 1;

        Logger.debug(`New Counter ${newCaseNumber}`, context);

        const _ = await this.caseNumberRepo
            .updateOne({ _id: caseNumberConfig.constantId }, { caseNumber: newCaseNumber });

        return newCaseNumber;
    }

    async bootstrapFirstCaseNumber(caseNumber?: number): Promise<number> {
        const firstCaseNumber: CaseNumber = {
            _id: caseNumberConfig.constantId,
            caseNumber: 1
        };
        const savedCaseNumber = await new this.caseNumberRepo(firstCaseNumber)
            .save();

        return savedCaseNumber.caseNumber;
    }

    async isLastCaseNumberGeneratedInSameYear(lastNumberTrackerDate: Date): Promise<boolean> {
        const context = `${CaseNumberService.name}::${this.isLastCaseNumberGeneratedInSameYear.name}`
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear()
        Logger.debug(`Today is year ${currentYear}`, context, false);
        const dataLastGeneratedYear = lastNumberTrackerDate.getFullYear();
        Logger.debug(`Last Generated Case Number Data was at ${dataLastGeneratedYear}`, context, false);
        if (currentYear === dataLastGeneratedYear){
            Logger.debug(`Same Year.`, context, false);
            return true
        }
        else {
            Logger.debug('Not Same Year.', context, false);
            return false;
        }
    }

}
