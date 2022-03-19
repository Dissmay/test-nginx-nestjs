import {
	Body,
	ClassSerializerInterceptor,
	Controller,
	Get,
	HttpCode,
	Post,
	Req,
	UseGuards,
	UseInterceptors,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import RegisterDto from './dto/register.dto';
import JwtAuthenticationGuard from './guards/jwt-authentication.guard';
import JwtRefreshGuard from './guards/jwt-refresh.guard';
import { LocalAuthGuard } from './guards/localAuthentication.guard';
import RequestWithUser from './requestWithUser.interface';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly usersService: UsersService,
	) { }

	// @UsePipes(new ValidationPipe())
	@Post('register')
	async register(@Body() registerData: RegisterDto) {

		const user = await this.authService.register(registerData);
		return user
	}

	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	@Post('logIn')
	@UseGuards(LocalAuthGuard)
	async logIn(@Req() request: RequestWithUser) {
		const { user } = request;
		const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(user.id);
		const {
			cookie: refreshTokenCookie,
			token: refreshToken
		} = this.authService.getCookieWithJwtRefreshToken(user.id);

		await this.usersService.setCurrentRefreshToken(refreshToken, user.id);

		request.res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);

		return user;
	}

	@Post('refresh')
	@UseGuards(JwtRefreshGuard)
	async refresh(@Req() request: any) {
		const { user } = request;

		const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(request.user.id);
		const {
			cookie: refreshTokenCookie,
			token: refreshToken
		} = this.authService.getCookieWithJwtRefreshToken(user.id);

		await this.usersService.setCurrentRefreshToken(refreshToken, user.id);
		request.res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);
	}

	@UseGuards(JwtAuthenticationGuard)
	@Post('test')
	@HttpCode(200)
	async test(@Req() request: RequestWithUser) {
		return 1
	}

	@UseGuards(JwtAuthenticationGuard)
	@Post('logOut')
	@HttpCode(200)
	async logOut(@Req() request: RequestWithUser) {
		await this.usersService.removeRefreshToken(request.user.id);
		request.res.setHeader('Set-Cookie', this.authService.getCookiesForLogOut());
	}

}
