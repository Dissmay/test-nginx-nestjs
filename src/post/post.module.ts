import { Module } from '@nestjs/common';
import PostService from './post.service';
import { PostController } from './post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './post.schema';
import { HttpModule } from '@nestjs/axios';
import { BullModule } from '@nestjs/bull';
import { join } from 'path';
import { PostSchemaTwo, PostTwo } from 'src/post-two/post-two.shema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    MongooseModule.forFeature([{ name: PostTwo.name, schema: PostSchemaTwo }]),
    HttpModule,
    BullModule.registerQueue({
      name: 'image',
      processors: [{
        name: 'optimize',
        path: join(__dirname, 'image.processor.js')
      }],
    }),
  ],
  providers: [PostService],
  controllers: [PostController]
})
class PostModule { }
export default PostModule;