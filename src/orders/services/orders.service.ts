import { Injectable } from '@nestjs/common';
import { CreateOrderDto, UpdateOrderDto } from 'src/orders/dto';
import { OrderRepository } from '../repositories';
import { UserEntity } from 'src/users/entities';
import { QueryOrderPaginationDto } from '../dto/query-order-pagination.dto';

@Injectable()
export class OrdersService {
  constructor(private orderRepository: OrderRepository) {}
  create(createOrderDto: CreateOrderDto, user: UserEntity) {
    return this.orderRepository.createAndSave(createOrderDto, user);
  }

  findAll(dto: QueryOrderPaginationDto) {
    return this.orderRepository.findAll(dto);
  }

  findOne(id: number) {
    return this.orderRepository.findOne(id);
  }

  update(id: number, updateOrderDto: UpdateOrderDto, user: UserEntity) {
    return this.orderRepository.createAndSave(updateOrderDto, user, id);
  }
}
