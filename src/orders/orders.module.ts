import { Module } from '@nestjs/common';
import { OrdersService } from 'src/orders/services';
import { OrdersController } from 'src/orders/controllers';
import { OrderEntity } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from './repositories';
@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity])],
  controllers: [OrdersController],
  providers: [OrdersService, OrderRepository],
})
export class OrdersModule {}
