import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtRefreshTokenStrategy } from './strategies/jwt-refresh-token.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
@Module({
	imports: [
		UsersModule,
		PassportModule,
		ConfigModule,
		JwtModule.register({}),
	],
	providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshTokenStrategy],
	controllers: [AuthController],
	exports: [AuthService]
})
export class AuthModule { }
