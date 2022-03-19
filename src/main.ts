import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { ValidationPipe } from './pipes/validation.pipe';
import * as cookieParser from 'cookie-parser';
// import { runInCluster } from './utils/runInCluster';
// import { CronExpression } from '@nestjs/schedule';
// var redis = require('redis').createClient()
// var CronJob = require('cron-cluster')(redis).CronJob
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.use(cookieParser());
  app.setGlobalPrefix('api');
  // app.useGlobalPipes(new ValidationPipe())

  await app.listen(5000);
}
bootstrap()
// runInCluster(bootstrap)
