import { Injectable } from '@nestjs/common';

// Case Number service enable the generating unique counter for case number
// 1. The case number start by 1 and increment by 1 after each casenumber is been generated
// 2 .The case number also should start from 1 on first query made if the in every new year.

@Injectable()
export class CaseNumberService {
    caseNumber: number;

    constructor() {
        
    }
}
