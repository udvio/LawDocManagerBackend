import { Injectable, Inject, HttpException, HttpStatus, Logger } from '@nestjs/common';
import userConfig from './config/user.config';
import { Model } from 'mongoose';
import { IUser } from './user.interface';

@Injectable()
export class UsersService {
    constructor(
        @Inject(userConfig.serviceToken)
        private readonly userRepo: Model<IUser>) { }

    async findOne(username:string):Promise<IUser>{
        const context = `${UsersService.name}::${this.findOne.name}`;
        return await this.userRepo
        .findOne({username})
        .exec()
        .then(user => {

            Logger.debug(`User Found is ${user.username}`,
             context,
              true);

            return user;
        })
        .catch(() => {
            Logger.error(`No User Found`,null,context, true);
            throw new HttpException('NOT AUTHORIZED', HttpStatus.UNAUTHORIZED);
        })
    }
}
