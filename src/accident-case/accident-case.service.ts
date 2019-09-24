import { Injectable, Inject } from '@nestjs/common';
import accidentCaseConfig from './accident-case.config';
import { Model } from 'mongoose';
import { IAccidentCase } from './accident-case.interface';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class AccidentCaseService {
    constructor(@InjectModel(accidentCaseConfig.serviceToken) private readonly caseRepo: Model<IAccidentCase>) {}

}

