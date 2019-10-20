import { Document, Schema, Types } from "mongoose";

export interface CaseNumberTracker{ 
    caseNumber: number
    updatedAt?:Date;

}

export interface caseNumberTrackerMongooseDocument extends Document, CaseNumberTracker{ 
}

export class CaseNumber implements CaseNumberTracker {
    _id:Types.ObjectId;
    caseNumber: number;
    updatedAt?:Date;
}

export const CaseNumberSchema = new Schema({
    caseNumber: {type:Number},
    updatedAt: {type:String, default:() => {
        const now = new Date();
        return now;
    }
    }
})