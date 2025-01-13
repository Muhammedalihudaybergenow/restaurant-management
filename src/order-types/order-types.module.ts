import { Module } from '@nestjs/common';
import { OrderTypesService } from './services/order-types.service';
import { OrderTypesController } from './controllers/order-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderTypeEntity } from './entities';
import { OrderTypeRepository } from './repositories';
@Module({
  imports: [TypeOrmModule.forFeature([OrderTypeEntity])],
  controllers: [OrderTypesController],
  providers: [OrderTypesService, OrderTypeRepository],
})
export class OrderTypesModule {}
