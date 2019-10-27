import { FactoryProvider } from "@nestjs/common/interfaces";
import { caseNumberConfig } from "./case-number.config";
import { Connection } from "mongoose";
import { CaseNumberSchema } from "./model/case-number";
import app_db from "../../database/app/app_db";


export const caseNumberProvider: FactoryProvider[] = [
    {

        provide: caseNumberConfig.serviceToken,
        useFactory: (connection: Connection) =>
            connection.model(
                caseNumberConfig.modelName,
                CaseNumberSchema,
                caseNumberConfig.collectionName),
        inject: [app_db.connectionName],
    }


];