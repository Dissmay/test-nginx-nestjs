import { HttpService } from '@nestjs/axios';
import { Controller, Get, Post } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
// var redis = require('redis').createClient()
// var CronJob = require('cron-cluster')(redis).CronJob

function doCron() {

}
interface HhResponse {
	found: number;
	pages: number;
	alternate_url: string;
}
@Controller('test-cron')
export class TestCronController {
	constructor(
		private httpService: HttpService
	) {

	}

	// @Get('test')
	// async test(): Promise<void> {

	// 	var job = new CronJob(CronExpression.EVERY_10_SECONDS, async () => {
	// 		let qs = `?start=1&limit=5000&convert=USD`
	// 		console.log(1);

	// 		// try {
	// 		// 	let res = await this.httpService.axiosRef.get(
	// 		// 		`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest${qs}`,
	// 		// 		{
	// 		// 			headers: {
	// 		// 				'X-CMC_PRO_API_KEY': '70069a26-5c65-497c-8089-bef83a0edfd6'
	// 		// 			},
	// 		// 		}
	// 		// 	);
	// 		// 	console.log(res);
	// 		// } catch (e) {
	// 		// 	console.log(e, 'eee');
	// 		// }
	// 	})
	// 	job.start()
	// 	// let result = res.data``
	// 	// console.log(result, 'res');
	// }
}
