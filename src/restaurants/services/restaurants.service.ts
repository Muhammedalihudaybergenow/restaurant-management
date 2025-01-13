import { Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from '../dto/create-restaurant.dto';
import { UpdateRestaurantDto } from '../dto/update-restaurant.dto';
import { RestaurantRepository } from '../repositories';
import { QueryRestaurantPaginationDto } from '../dto/query-restaurant.repository';
@Injectable()
export class RestaurantsService {
  constructor(private restaurantRepository: RestaurantRepository) {}
  create(createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantRepository.createAndSave(createRestaurantDto);
  }

  findAll(dto: QueryRestaurantPaginationDto) {
    return this.restaurantRepository.findAll(dto);
  }

  findOne(id: number) {
    return this.restaurantRepository.findOne(id);
  }

  update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
    return this.restaurantRepository.createAndSave(updateRestaurantDto, id);
  }
}
