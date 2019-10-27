import { Types } from "mongoose";

export interface MongoAppConfig {
    readonly serviceToken: string;
    readonly modelName: string;
    readonly collectionName: string;
    readonly constantId?:Types.ObjectId;
}
