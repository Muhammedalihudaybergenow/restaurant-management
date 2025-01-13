import { Module } from '@nestjs/common';
import { RestaurantsService } from './services/restaurants.service';
import { RestaurantsController } from './controllers/restaurants.controller';
import { RestaurantRepository } from './repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantEntity } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([RestaurantEntity])],
  controllers: [RestaurantsController],
  providers: [RestaurantsService, RestaurantRepository],
})
export class RestaurantsModule {}
