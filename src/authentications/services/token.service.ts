import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, TokenInterface } from 'src/authentications/interfaces';
import { TokenTypeEnum } from '../enums';
@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async generateAccessToken(payload: JwtPayload) {
    return {
      token: await this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_ACCESS_SECRET'),
        expiresIn: this.configService.get('JWT_ACCESS_EXPIRES_IN'),
      }),
      expiresIn: this.configService.get('JWT_ACCESS_EXPIRES_IN'),
    };
  }

  async generateRefreshToken(payload: JwtPayload) {
    return this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN'),
      secret: this.configService.get('JWT_REFRESH_SECRET'),
    });
  }

  async generateTokens(payload: JwtPayload): Promise<TokenInterface> {
    return {
      access: await this.generateAccessToken(payload),
      refresh: await this.generateRefreshToken(payload),
    };
  }

  async validate(token: string, type: TokenTypeEnum): Promise<JwtPayload> {
    return this.jwtService.verifyAsync(token, {
      secret:
        type === TokenTypeEnum.ACCESS
          ? this.configService.get('JWT_ACCESS_SECRET')
          : this.configService.get('JWT_REFRESH_SECRET'),
      ignoreExpiration: false,
    });
  }
}
