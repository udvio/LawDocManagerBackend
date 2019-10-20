import { MongoAppConfig } from "../../shared/interface/config.interface";

export const userConfig: MongoAppConfig ={
    serviceToken: 'UserService',
    modelName: 'IUser',
    collectionName: 'users'
}

export default userConfig;