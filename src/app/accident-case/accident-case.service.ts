import { Injectable, Inject } from '@nestjs/common';
import accidentCaseConfig from './config/accident-case.config';
import { Model } from 'mongoose';
import { IAccidentCase } from './interface/accident-case.interface';

@Injectable()
export class AccidentCaseService {
    constructor(@Inject(accidentCaseConfig.serviceToken) private readonly caseRepo: Model<IAccidentCase>) {}

}
