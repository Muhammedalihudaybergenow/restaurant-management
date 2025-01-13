import { Body, Controller, Param, ParseEnumPipe, Post } from '@nestjs/common';
import { AuthenticationsService } from '../services/authentications.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from '../dto';
import { TokenDto } from '../dto/token.dto';
import { TokenTypeEnum } from '../enums';

@Controller('authentications')
@ApiTags('auths')
export class AuthenticationsController {
  constructor(
    private readonly authenticationsService: AuthenticationsService,
  ) {}

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authenticationsService.login(body);
  }

  @Post('change-token')
  changeToken(@Body() body: TokenDto) {
    return this.authenticationsService.changeToken(body.token);
  }

  @Post('validate/token/:type')
  validateToken(
    @Param('type', new ParseEnumPipe(TokenTypeEnum)) type: TokenTypeEnum,
    @Body() body: TokenDto,
  ) {
    return this.authenticationsService.validateToken(body.token, type);
  }
}
