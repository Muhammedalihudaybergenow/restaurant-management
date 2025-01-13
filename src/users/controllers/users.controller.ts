import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { UserQueryPaginatedDto } from '../dto/user-query.dto';
import { Permissions } from 'src/common/decorators';
import { UserRoleEnum } from 'src/common/enums';

@Controller({
  path: 'manager/users',
})
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Permissions(UserRoleEnum.ADMIN)
  create(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Patch(':id')
  @Permissions(UserRoleEnum.ADMIN)
  update(@Body() body: UpdateUserDto, @Param('id') id: string) {
    return this.usersService.update(body, +id);
  }

  @Get()
  @Permissions(UserRoleEnum.ADMIN)
  findAll(@Query() query: UserQueryPaginatedDto) {
    return this.usersService.findAll(query);
  }

  @Get(':id')
  @Permissions(UserRoleEnum.ADMIN)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
}
