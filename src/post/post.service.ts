import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './post.schema';
import PostDto from './dto/post.dto';
import { PostDocumentTwo, PostTwo } from 'src/post-two/post-two.shema';

@Injectable()
class PostsService {
	constructor(
		@InjectModel(Post.name) private postModel: Model<PostDocument>,
		@InjectModel(PostTwo.name) private postModelTwo: Model<PostDocumentTwo>
	) { }
	async create(postData: PostDto) {
		// let post1 = await this.postModel.findById('6208e875734c8fa8cf0f0bc2');

		// // const createdPost = await this.postModelTwo.findById('6208e658227282ea479186b1 ')
		// const filter = { id: '6208e658227282ea479186b1' };
		// const update = { post: post1._id };

		// let res = await this.postModelTwo.findOneAndUpdate(filter, update);
		// console.log(res, 'asd');

		const createdCat = new this.postModel(postData);

		return await createdCat.save()
		// return createdPost.save();
	}
	async findAll() {
		return this.postModel.find();
	}
	async find() {
		let res = await (await this.postModelTwo.findOne({ _id: '6208e658227282ea479186b1' })).populate('post');
		return res
	}
	async findOne(id: string) {
		const post = await this.postModel.findById(id);
		if (!post) {
			throw new NotFoundException();
		}
		return post;
	}
}

export default PostsService;
