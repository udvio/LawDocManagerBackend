import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccidentCaseModule } from './app/accident-case/accident-case.module';
import { AppMainDBModule } from './database/app/app_db.module';
import { ConfigModule } from './config/config.module';
import { PersonModule } from './app/person/person.module';
import { CaseNumberModule } from './app/case_number/case-number.module';
import { RedisModule } from './database/redis/redis.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './app/users/users.module';



@Module({
  imports: [ConfigModule,
    AppMainDBModule,
    AccidentCaseModule,
    PersonModule,
    CaseNumberModule,
    RedisModule,
    AuthModule,
    UsersModule],

  controllers: [AppController],
  
  providers: [AppService],
})
export class AppModule { }
