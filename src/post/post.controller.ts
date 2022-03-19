import { Body, Controller, Get, Post, Res, UploadedFiles, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import JwtAuthenticationGuard from 'src/auth/guards/jwt-authentication.guard';
import PostDto from './dto/post.dto';
import PostsService from './post.service';
import { HttpService } from '@nestjs/axios';
const fs = require("fs");
const FormData = require("form-data");
import { Worker } from 'worker_threads';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { Response } from 'express';

@Controller('post')
export class PostController {

	constructor(
		private readonly postsService: PostsService,
		private httpService: HttpService,
		@InjectQueue('image') private readonly imageQueue: Queue
	) { }

	// @UseGuards(JwtAuthenticationGuard)
	@Post()
	async createPost(@Body() post: PostDto) {
		return this.postsService.create(post);
	}
	// @UseGuards(JwtAuthenticationGuard)
	@Get()
	async getPost() {
		console.log('gettttttttttttttttt');

		// return this.postsService.find();
	}

	@Post('pinJSONToIPFS')
	async pinJSONToIPFS() {
		var data = JSON.stringify({ "name": "Test NFT", "description": "Test NFT", "image": "https://gateway.pinata.cloud/ipfs/Qmcnup3zmxyagYxCH7fKJGQQKedBeVZKNghvcEJ3SoNDxf", "external_url": "https://app.rarible.com/A.ebf4ae01d1284af8.RaribleNFT:2425", "attributes": [{ "key": "Test", "trait_type": "Test", "value": "Test" }] });

		console.log(data, 'data');

		let res = await this.httpService.axiosRef.post('https://api.pinata.cloud/pinning/pinJSONToIPFS', data, {
			headers: {
				'pinata_api_key': '63a4915c2cb4942c3ebd',
				'pinata_secret_api_key': '7b3f02c6f611fe1c37fcb578b799557fba1d135cec6f5d5a6512ab8f8c4e6594',
				'Content-Type': 'application/json'
			},
		})
		console.log(res.data, 'asdasd');
	}

	@Post('pinFileToIPFS')
	async pinFileToIPFS() {
		const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
		let data = new FormData();

		data.append("file", fs.createReadStream("./shark.webp"));

		let res = await this.httpService.axiosRef.post(url, data, {
			headers: {
				pinata_api_key: '63a4915c2cb4942c3ebd',
				pinata_secret_api_key: '7b3f02c6f611fe1c37fcb578b799557fba1d135cec6f5d5a6512ab8f8c4e6594',
				"Content-Type": `multipart/form-data; boundary= ${data._boundary}`,
			},
		})
		console.log(res.data, 'asd');
	}

	@Post('test')
	async d() {
		console.log('11111111');

		const worker = new Worker('./worker.js', {
			workerData: {
				value: 15,
				path: './worker.js'
			}
		});

		worker.on('message', (result) => {
			console.log(result);
		});
	}

	@Post('image')
	async processImage(@Body() post) {
		console.log(this.imageQueue, 'imageQueue');

		const job = await this.imageQueue.add('optimize', 1);

		return {
			jobId: job.id
		}
	}

	@Post('image2')
	async aaa(@Res() response: Response) {

		const job = await this.imageQueue.getJob(2);
		let jobs = await this.imageQueue.getJobs(['completed']);
		jobs.forEach(j => {
			console.log(j.id);

		})
		// const isCompleted = await job.isCompleted();
		const isCompleted = await job.isCompleted();
		if (!isCompleted) {
			// return response.sendStatus(202);
		}
		// if (!isCompleted) {
		// 	return res.sendStatus(202);
		// } 

		return response.end('1')
	}
}