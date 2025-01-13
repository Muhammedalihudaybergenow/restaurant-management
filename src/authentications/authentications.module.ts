import { Module } from '@nestjs/common';
import { AuthenticationsController } from './controllers/authentications.controller';
import { AuthRepository } from './repositories';
import { TokenService, AuthenticationsService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies';
import { JwtAuthGuard } from './guards';
import { PassportModule } from '@nestjs/passport';
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        global: true,
        secret: config.get('JWT_ACCESS_TOKEN'),
      }),
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
      global: true,
    }),
  ],
  controllers: [AuthenticationsController],
  providers: [
    AuthenticationsService,
    AuthRepository,
    TokenService,
    JwtStrategy,
    JwtAuthGuard,
  ],
  exports: [PassportModule],
})
export class AuthenticationsModule {}
