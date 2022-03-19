import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Post } from 'src/post/post.schema';

export type PostDocumentTwo = PostTwo & Document;

@Schema()
export class PostTwo {
	@Prop()
	titleTwo: string;

	@Prop()
	contentTwo: string;

	@Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }])
	post: Post;
}

export const PostSchemaTwo = SchemaFactory.createForClass(PostTwo);