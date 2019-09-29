import { MongoAppConfig } from "../shared/interface/config.interface";
import { Types } from "mongoose";


export const caseNumberConfig:MongoAppConfig = {
    serviceToken:'caseNumberServiceToken',
    collectionName: 'caseNumberTracker',
    modelName: 'CaseNumber',
    constantId:Types.ObjectId('5d8f09dc0e47843eb6d95d7c'),
}