import { Repository } from 'typeorm';
import { OrderEntity } from '../entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateOrderDto } from '../dto';
import { UserEntity } from 'src/users/entities';
import { OrderTypeEntity } from 'src/order-types/entities';
import { QueryOrderPaginationDto } from '../dto/query-order-pagination.dto';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(OrderEntity) private repository: Repository<OrderEntity>,
  ) {}

  async createAndSave(dto: UpdateOrderDto, user: UserEntity, id?: number) {
    const entity = new OrderEntity({
      chairCount: dto.chairCount,
      comment: dto.comment,
      date: dto.date,
      fullName: dto.fullName,
      endTime: dto.endTime,
      id,
      note: dto.note,
      orderTypeId: dto.orderTypeId,
      phonenumber: dto.phonenumber,
      updatedById: user.id,
      startTime: dto.startTime,
      status: dto.status,
    });
    if (!id) {
      entity.createdById = user.id;
      entity.createdAt = new Date().getTime();
    }
    if (dto.orderTypeId) {
      const orderType = await this.repository.manager
        .getRepository(OrderTypeEntity)
        .createQueryBuilder('ot')
        .where('ot.id =:id', { id: dto.orderTypeId })
        .addSelect('ot.restaurantId')
        .getOne();
      entity.price = orderType.price;
      entity.restaurantId = orderType.restaurantId;
      entity.orderTypeName = orderType.name;
    }
    return this.repository.save(entity);
  }

  findAll(dto: QueryOrderPaginationDto) {
    const {
      maxCreatedAt,
      maxDate,
      minCreatedAt,
      minDate,
      order_by,
      order_direction,
      restaurantId,
      search,
      status,
    } = dto;

    const query = this.repository
      .createQueryBuilder('o')
      .leftJoin('o.updatedBy', 'ub');
    if (maxCreatedAt) {
      query.andWhere('o.createdAt < :maxCreatedAt', { maxCreatedAt });
    }
    if (minCreatedAt) {
      query.andWhere('o.createdAt > :minCreatedAt', { minCreatedAt });
    }
    if (maxDate) {
      query.andWhere('o.date <= :maxDate', { maxDate });
    }
    if (status) {
      query.andWhere('o.status = :status', { status });
    }
    if (minDate) {
      query.andWhere('o.date >= :minDate', { minDate });
    }
    if (restaurantId) {
      query.andWhere('o.restaurantId =:restaurantId', { restaurantId });
    }
    if (search) {
      query.andWhere(
        'o.phonenumber ilike :search or o.full_name ilike :search or o.note ilike :search or o.comment ilike :search',
        { search: `%${search}%` },
      );
    }
    query.orderBy(`o.${order_by}`, order_direction);
    query
      .select('o.id')
      .addSelect([
        'o.fullName',
        'o.chairCount',
        'o.date',
        'o.phonenumber',
        'o.orderTypeName',
        'o.startTime',
        'o.endTime',
        'o.price',
        'o.status',
        'ub.id',
        'ub.firstName',
        'ub.lastName',
      ]);
    return query.getMany();
  }

  findOne(id: number) {
    return this.repository
      .createQueryBuilder('o')
      .leftJoin('o.updatedBy', 'ub')
      .leftJoin('o.createdBy', 'cb')
      .where('o.id =:id', { id })
      .select('o.id')
      .addSelect([
        'o.fullName',
        'o.chairCount',
        'o.date',
        'o.phonenumber',
        'o.startTime',
        'o.endTime',
        'o.price',
        'o.status',
        'o.note',
        'o.orderTypeName',
        'o.comment',
        'ub.id',
        'ub.firstName',
        'ub.lastName',
        'cb.id',
        'cb.firstName',
        'cb.lastName',
      ])
      .getOne();
  }
}
