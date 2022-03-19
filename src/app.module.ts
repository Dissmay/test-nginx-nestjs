import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
import { CourseModule } from './course/course.module';
import { StreamModule } from './stream/stream.module';
import { TaskModule } from './task/task.module';
import { StudentModule } from './student/student.module';
import { MentorModule } from './mentor/mentor.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { TestCronModule } from './test-cron/test-cron.module';
import * as Joi from '@hapi/joi';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';
import { LogsMiddleware } from './logs.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkerModule } from './worker/worker.module';
import PostModule from './post/post.module';
import { BullModule } from '@nestjs/bull';
import { PostTwoModule } from './post-two/post-two.module';
@Module({
  imports: [
    // GraphQLModule.forRoot({}),
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
        AWS_ACCESS_KEY_ID: Joi.string(),
        AWS_SECRET_ACCESS_KEY: Joi.string().required(),
        JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
        MONGO_USERNAME: Joi.string().required(),
        MONGO_PASSWORD: Joi.string().required(),
        MONGO_DATABASE: Joi.string().required(),
        MONGO_PATH: Joi.string().required(),
      })
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          port: Number(configService.get('REDIS_PORT')),
        },
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const username = configService.get('MONGO_USERNAME');
        const password = configService.get('MONGO_PASSWORD');
        const database = configService.get('MONGO_DATABASE');
        const host = configService.get('MONGO_HOST');
        console.log(`mongodb://${username}:${password}@${host}`, 'aaaa');

        return {
          uri: `mongodb://${username}:${password}@${host}`,
          dbName: database,
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    CourseModule,
    StreamModule,
    TaskModule,
    StudentModule,
    MentorModule,
    DatabaseModule,
    UsersModule,
    TestCronModule,
    HttpModule,
    PostModule,
    WorkerModule,
    PostTwoModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogsMiddleware).forRoutes('*')
  }
}
