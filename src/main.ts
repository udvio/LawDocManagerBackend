import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {address} from 'ip';

async function bootstrap() {
  /*********  Configure Application  *******************/
  const appName = 'Law Doc Manager Backend';
  const app = await NestFactory.create(AppModule);
  const config = app.select(ConfigModule).get(ConfigService);
  const runPort: number = config.serverPort;
  /*****************************************************/

  /*********  Configure Swagger Api Documentation  ***********/
  const swaggerOptions = new DocumentBuilder()
  .setTitle('Law Doc Manager')
  .setDescription('The Law Doc Manager Backend API description')
  .setVersion(config.appVersion).build();

  const swaggerDocument = SwaggerModule.createDocument(app,swaggerOptions);
  SwaggerModule.setup('api',app,swaggerDocument);

  await app.listen(runPort, () => {
    Logger.debug(`Version:${config.appVersion} in ${config.environment} mode.`, appName);
    Logger.debug(`Application running in ${address()}:${runPort}`, appName);
  });
}
bootstrap();
