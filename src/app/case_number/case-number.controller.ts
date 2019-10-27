import { Controller, Get, Post } from '@nestjs/common';
import { CaseNumberService } from './case-number.service';

@Controller('case-number')
export class CaseNumberController {
    
    constructor(private readonly caseNumberService:CaseNumberService){}

    @Post()
    async getNewCaseNumber():Promise<number>{
        return await this.caseNumberService.createNewCaseNumber();
    }


    @Post('/bootstrap')
    async bootstrapNumberTracker(){
        return await this.caseNumberService.bootstrapFirstCaseNumber();
    }
}
