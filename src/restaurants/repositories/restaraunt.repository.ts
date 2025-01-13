import { Repository } from 'typeorm';
import { RestaurantEntity } from '../entities';
import { Injectable } from '@nestjs/common';
import { UpdateRestaurantDto } from '../dto';
import { QueryRestaurantPaginationDto } from '../dto/query-restaurant.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RestaurantRepository {
  constructor(
    @InjectRepository(RestaurantEntity)
    private restaurantRepository: Repository<RestaurantEntity>,
  ) {}

  createAndSave(dto: UpdateRestaurantDto, id?: number) {
    const entity = new RestaurantEntity({
      name: dto.name,
      userId: dto.userId,
      id: id,
      file: dto.file,
      slug: dto.slug,
    });
    return this.restaurantRepository.save(entity);
  }

  findAll(dto: QueryRestaurantPaginationDto) {
    const { limit, order_by, order_direction, page, search } = dto;
    const query = this.restaurantRepository
      .createQueryBuilder('r')
      .leftJoin('r.user', 'u')
      .select('r')
      .addSelect(['u.id', 'u.firstName', 'u.lastName']);
    // .addSelect('r.orderCount');

    if (search) {
      query.andWhere('r.name ilike :search or r.slug ilike :search', {
        search: `%${search}%`,
      });
    }
    query.take(limit).skip((page - 1) * limit);
    query.orderBy(`r.${order_by}`, order_direction);
    return query.getMany();
  }

  findOne(id: number) {
    return this.restaurantRepository
      .createQueryBuilder('r')
      .leftJoin('r.users', 'u')
      .select('r')
      .addSelect('r.restaurantCount')
      .addSelect(['u.id', 'u.firstName', 'u.lastName'])
      .where('u.id = :id', { id })
      .getOne();
  }
}
