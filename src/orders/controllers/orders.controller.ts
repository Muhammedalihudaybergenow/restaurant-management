import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { OrdersService } from '../services';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserRoleEnum } from 'src/common/enums';
import { CurrentUser, Permissions } from 'src/common/decorators';
import { UserEntity } from 'src/users/entities';
import { QueryOrderPaginationDto } from '../dto/query-order-pagination.dto';

@Controller('orders')
@ApiTags('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @Permissions(UserRoleEnum.CUSTOMER)
  create(
    @Body() createOrderDto: CreateOrderDto,
    @CurrentUser() user: UserEntity,
  ) {
    return this.ordersService.create(createOrderDto, user);
  }

  @Get()
  @Permissions(UserRoleEnum.CUSTOMER)
  findAll(@Query() query: QueryOrderPaginationDto) {
    return this.ordersService.findAll(query);
  }

  @Get(':id')
  @Permissions(UserRoleEnum.CUSTOMER)
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  @Permissions(UserRoleEnum.CUSTOMER)
  update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
    @CurrentUser() user: UserEntity,
  ) {
    return this.ordersService.update(+id, updateOrderDto, user);
  }
}
