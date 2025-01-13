import {
  ForbiddenException,
  Injectable,
  MethodNotAllowedException,
} from '@nestjs/common';
import { AuthRepository } from '../repositories';
import { LoginDto, LoginResponseDto } from '../dto';
import { HashHelper } from 'src/common/utils';
import { UserStatusEnum } from 'src/common/enums';
import { TokenService } from './token.service';
import { TokenTypeEnum } from '../enums';

@Injectable()
export class AuthenticationsService {
  constructor(
    private authRepository: AuthRepository,
    private tokenService: TokenService,
  ) {}

  async login(dto: LoginDto) {
    const { username, password } = dto;
    const user = await this.authRepository.findOneByUserName(username);
    if (!user) {
      throw new MethodNotAllowedException(`username or password is invalid`);
    }
    const checkPassword = await HashHelper.compare(password, user.password);
    if (!checkPassword) {
      throw new MethodNotAllowedException('username or password is invalid');
    }
    if (user.status !== UserStatusEnum.ACTIVE) {
      throw new ForbiddenException('User is not active');
    }
    const tokens = await this.tokenService.generateTokens({
      id: user.id,
    });
    return new LoginResponseDto(user, tokens);
  }

  async changeToken(token: string) {
    try {
      const { id } = await this.tokenService.validate(
        token,
        TokenTypeEnum.REFRESH,
      );
      const user = await this.authRepository.findUserById(id);
      if (user.status !== UserStatusEnum.ACTIVE) {
        throw new ForbiddenException('User is not active');
      }
      const tokens = await this.tokenService.generateTokens({
        id: user.id,
      });
      return new LoginResponseDto(user, tokens);
    } catch (error) {
      throw new MethodNotAllowedException({
        message: 'TOKEN EXPIRED',
        error: error.message,
      });
    }
  }

  async validateToken(token: string, type: TokenTypeEnum) {
    try {
      await this.tokenService.validate(token, type);
      return 'Success';
    } catch (error) {
      throw new MethodNotAllowedException({
        message: 'TOKEN EXPIRED',
        error: error.message,
      });
    }
  }
}
