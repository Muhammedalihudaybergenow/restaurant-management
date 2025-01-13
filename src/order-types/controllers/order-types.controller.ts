import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { OrderTypesService } from '../services/order-types.service';
import { CreateOrderTypeDto } from '../dto/create-order-type.dto';
import { UpdateOrderTypeDto } from '../dto/update-order-type.dto';
import { ApiTags } from '@nestjs/swagger';
import { QueryOrderTypeDto } from '../dto';
import { UserRoleEnum } from 'src/common/enums';
import { Permissions } from 'src/common/decorators';

@Controller('order-types')
@ApiTags('order-types')
export class OrderTypesController {
  constructor(private readonly orderTypesService: OrderTypesService) {}

  @Post()
  @Permissions(UserRoleEnum.CUSTOMER)
  create(@Body() createOrderTypeDto: CreateOrderTypeDto) {
    return this.orderTypesService.create(createOrderTypeDto);
  }

  @Get()
  @Permissions(UserRoleEnum.CUSTOMER)
  findAll(@Query() query: QueryOrderTypeDto) {
    return this.orderTypesService.findAll(query);
  }

  @Get(':id')
  @Permissions(UserRoleEnum.CUSTOMER)
  findOne(@Param('id') id: string) {
    return this.orderTypesService.findOne(+id);
  }

  @Patch(':id')
  @Permissions(UserRoleEnum.CUSTOMER)
  update(
    @Param('id') id: string,
    @Body() updateOrderTypeDto: UpdateOrderTypeDto,
  ) {
    return this.orderTypesService.update(+id, updateOrderTypeDto);
  }
}
