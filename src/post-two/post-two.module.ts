import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostTwoService } from './post-two.service';
import { PostTwo, PostSchemaTwo } from './post-two.shema';
import { PostTwoController } from './post-two.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: PostTwo.name, schema: PostSchemaTwo }])],
  providers: [PostTwoService],
  controllers: [PostTwoController],
  exports: [PostTwoService]
})
export class PostTwoModule { }
