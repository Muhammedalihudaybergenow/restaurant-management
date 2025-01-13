import { Repository } from 'typeorm';
import { OrderTypeEntity } from '../entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryOrderTypeDto, UpdateOrderTypeDto } from '../dto';

@Injectable()
export class OrderTypeRepository {
  constructor(
    @InjectRepository(OrderTypeEntity)
    private repository: Repository<OrderTypeEntity>,
  ) {}

  createAndSave(dto: UpdateOrderTypeDto, id?: number) {
    const { isActive, name, price, restaurantId } = dto;
    const entity = new OrderTypeEntity({
      isActive,
      name,
      price,
      restaurantId,
      id,
    });
    return this.repository.save(entity);
  }

  findAll(dto: QueryOrderTypeDto) {
    const {
      isActive,
      limit,
      order_by,
      order_direction,
      page,
      search,
      restaurantId,
    } = dto;
    const query = this.repository.createQueryBuilder('ot');
    if (search) {
      query.andWhere('ot.name ilike :search', { search: `%${search}%` });
    }
    if (isActive) {
      query.andWhere('ot.isActive = :isActive', { isActive });
    }
    if (restaurantId) {
      query.andWhere('ot.restaurantId =:id', { id: restaurantId });
    }
    query.orderBy(`ot.${order_by}`, order_direction);
    query.take(limit).skip((page - 1) * limit);
    return query.getMany();
  }

  findOne(id: number) {
    return this.repository
      .createQueryBuilder('ot')
      .where('ot.id =:id', { id })
      .getOne();
  }
}
