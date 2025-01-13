import { Injectable } from '@nestjs/common';
import { CreateOrderTypeDto } from '../dto/create-order-type.dto';
import { UpdateOrderTypeDto } from '../dto/update-order-type.dto';
import { OrderTypeRepository } from '../repositories';
import { QueryOrderTypeDto } from '../dto';

@Injectable()
export class OrderTypesService {
  constructor(private orderTypeRepository: OrderTypeRepository) {}
  create(createOrderTypeDto: CreateOrderTypeDto) {
    return this.orderTypeRepository.createAndSave(createOrderTypeDto);
  }

  findAll(dto: QueryOrderTypeDto) {
    return this.orderTypeRepository.findAll(dto);
  }

  findOne(id: number) {
    return this.orderTypeRepository.findOne(id);
  }

  update(id: number, updateOrderTypeDto: UpdateOrderTypeDto) {
    return this.orderTypeRepository.createAndSave(updateOrderTypeDto, id);
  }
}
