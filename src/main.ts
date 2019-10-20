import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {address} from 'ip';

async function bootstrap() {
  /*********  Configure Application  *******************/
  const app = await NestFactory.create(AppModule);
  const config = app.select(ConfigModule).get(ConfigService);
  const runPort: number = config.serverPort;
  const appName = config.firmName
  /*****************************************************/

  /*********  Configure Swagger Api Documentation  ***********/
  const swaggerOptions = new DocumentBuilder()
  .setTitle(appName)
  .setDescription(`${appName} Backend API description`)
  .setContactEmail(config.developerEmail)
  .setVersion(config.appVersion).build();

  const swaggerDocument = SwaggerModule.createDocument(app,swaggerOptions);
  SwaggerModule.setup('api',app,swaggerDocument);

  await app.listen(runPort, () => {
    Logger.debug(`Version:${config.appVersion} in ${config.environment} mode.`, appName);
    Logger.debug(`Application running in ${address()}:${runPort}`, appName);
  });
}
bootstrap();
