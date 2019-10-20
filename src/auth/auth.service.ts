import { Injectable } from '@nestjs/common';
import { UsersService } from '../app/users/users.service';
import {JwtService} from '@nestjs/jwt';
import { IUser } from 'src/app/users/user.interface';
import { User } from 'src/app/users/dto/user.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService) { }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findOne(username);
        if (user && user.password === password) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user:User){
        const payload = {username: user.username, sub:user.password};
        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}
