import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { userProvider } from './user.provider';
import { UsersController } from './users.controller';
import { AppMainDBModule } from '../../database/app/app_db.module';

@Module({
  imports: [AppMainDBModule],
  providers: [UsersService,userProvider],
  controllers: [UsersController],
  exports: [UsersService,userProvider]
})
export class UsersModule {}
