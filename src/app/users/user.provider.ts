import { FactoryProvider } from "@nestjs/common/interfaces";
import userConfig from "./config/user.config";
import {Connection } from "mongoose";
import { UserSchema } from "./schema/user.schema";
import app_db from "../../database/app/app_db";


export const userProvider: FactoryProvider = {
    provide: userConfig.serviceToken,
    useFactory: (connection: Connection) => 
        connection.model(
            userConfig.modelName,
            UserSchema,
            userConfig.collectionName),
    inject: [app_db.connectionName]
}