import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { RestaurantsService } from '../services/restaurants.service';
import { CreateRestaurantDto } from '../dto/create-restaurant.dto';
import { UpdateRestaurantDto } from '../dto/update-restaurant.dto';
import { ApiTags } from '@nestjs/swagger';
import { Permissions } from 'src/common/decorators';
import { UserRoleEnum } from 'src/common/enums';
import { QueryRestaurantPaginationDto } from '../dto/query-restaurant.repository';

@Controller('restaurants')
@ApiTags('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Post()
  @Permissions(UserRoleEnum.ADMIN)
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantsService.create(createRestaurantDto);
  }

  @Get()
  @Permissions(UserRoleEnum.ADMIN)
  findAll(@Query() query: QueryRestaurantPaginationDto) {
    return this.restaurantsService.findAll(query);
  }

  @Get(':id')
  @Permissions(UserRoleEnum.ADMIN)
  findOne(@Param('id') id: string) {
    return this.restaurantsService.findOne(+id);
  }

  @Patch(':id')
  @Permissions(UserRoleEnum.ADMIN)
  update(
    @Param('id') id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ) {
    return this.restaurantsService.update(+id, updateRestaurantDto);
  }
}
