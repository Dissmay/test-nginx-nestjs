import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";


@Injectable()
export class ValidationPipe implements PipeTransform<any> {
	async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
		console.log('11111111');

		const obj = plainToClass(metadata.metatype, value);
		const errors = await validate(obj);

		if (errors.length) {
			let messages = errors.map(err => {
				return `${err.property} - ${Object.values(err.constraints).join(', ')}`
			})
			throw new ValidationException(messages)
		}
		return value;
	}

}

class ValidationException extends HttpException {
	messages;

	constructor(response) {
		super(response, HttpStatus.BAD_REQUEST);
		this.messages = response.push(HttpStatus.BAD_REQUEST)
	}
}
