import { Module } from '@nestjs/common';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import { personProvider } from './person.provider';
import { AppMainDBModule } from '../../database/app/app_db.module';

@Module({
  imports: [AppMainDBModule],
  controllers: [PersonController],
  providers: [PersonService, ...personProvider],
  exports: [PersonService, ...personProvider],
})
export class PersonModule {}
