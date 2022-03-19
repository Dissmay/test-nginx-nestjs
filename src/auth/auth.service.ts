import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
import PostgresErrorCode from 'src/database/postgresErrorCode.enum';
import RegisterDto from './dto/register.dto';
@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService
	) { }
	public async register(registrationData: RegisterDto) {

		const hashedPassword = await bcrypt.hash(registrationData.password, 10);
		try {
			const createdUser = await this.usersService.create({
				...registrationData,
				password: hashedPassword
			});
			createdUser.password = undefined;
			return createdUser;
		} catch (error) {

			if (error?.code === PostgresErrorCode.UniqueViolation) {
				throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);
			}
			throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	public async getAuthenticatedUser(email: string, plainTextPassword: string) {
		try {
			const user = await this.usersService.getByEmail(email);
			await this.verifyPassword(plainTextPassword, user.password);
			return user;
		} catch (error) {
			throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
		}
	}
	private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
		const isPasswordMatching = await bcrypt.compare(
			plainTextPassword,
			hashedPassword
		);
		if (!isPasswordMatching) {
			throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
		}
	}
	public getCookieWithJwtAccessToken(userId: number) {
		const payload = { userId };

		const token = this.jwtService.sign(payload, {
			secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
			expiresIn: `${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}m`
		});

		return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}`;
	}
	public getCookieWithJwtRefreshToken(userId: number) {
		const payload = { userId };

		const token = this.jwtService.sign(payload, {
			secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
			expiresIn: `${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}m`
		});
		const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}`;
		return {
			cookie,
			token
		}
	}

	public getCookiesForLogOut() {
		return [
			'Authentication=; HttpOnly; Path=/; Max-Age=0',
			'Refresh=; HttpOnly; Path=/; Max-Age=0'
		]
	}
}
