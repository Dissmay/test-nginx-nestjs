import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PostDocumentTwo, PostTwo } from './post-two.shema';

@Injectable()
export class PostTwoService {
	constructor(@InjectModel(PostTwo.name) private postModel: Model<PostDocumentTwo>) { }
	create(postData) {
		const createdPost = new this.postModel(postData);
		return createdPost.save();
	}
	async findAll() {
		return this.postModel.find();
	}
	async findOne(id: string) {
		const post = await this.postModel.findById(id);
		if (!post) {
			throw new NotFoundException();
		}
		return post;
	}
}

