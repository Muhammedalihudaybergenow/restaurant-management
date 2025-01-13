import { UserStatusEnum } from 'src/common/enums';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthRepository } from '../repositories';
import { JwtPayload } from '../interfaces';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private configService: ConfigService,
    private authRepository: AuthRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_ACCESS_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    const { id } = payload;
    if (!id) {
      throw new NotFoundException('User ID not found in JWT payload');
    }
    const user = await this.authRepository.findUserById(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    if (user.status != UserStatusEnum.ACTIVE) {
      throw new ForbiddenException('User was deactivated');
    }
    return user;
  }
}
