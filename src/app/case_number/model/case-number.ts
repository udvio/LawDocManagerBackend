import { Document, Schema, Types } from "mongoose";

export interface NumberTracker{ 
    caseNumber: number
}

export interface NumberTrackerDocument extends Document, NumberTracker{ 
    caseNumber: number
}

export class CaseNumber implements NumberTracker {
    _id:Types.ObjectId;
    caseNumber: number;
}

export const CaseNumberSchema = new Schema({
    caseNumber: {type:Number},
    updateAt: {type:String, default:() => {
        const now = new Date(Date.now());
        return now;
    }
    }
})