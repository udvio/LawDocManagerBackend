import { Injectable, Inject } from '@nestjs/common';
import accidentCaseConfig from './accident-case.config';
import { Model } from 'mongoose';
import { IAccidentCase } from './accident-case.interface';

@Injectable()
export class AccidentCaseService {
    constructor(@Inject(accidentCaseConfig.serviceToken) private readonly caseRepo: Model<IAccidentCase>) {}

}
