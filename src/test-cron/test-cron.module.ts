import { Module } from '@nestjs/common';
import { TestCronController } from './test-cron.controller';
import { HttpModule } from '@nestjs/axios';
@Module({
  controllers: [TestCronController],
  imports: [HttpModule]
})
export class TestCronModule { }
