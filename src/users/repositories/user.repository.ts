import { Repository } from 'typeorm';
import { UserEntity } from '../entities';
import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../dto';
import { UserQueryPaginatedDto } from '../dto/user-query.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HashHelper } from 'src/common/utils';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createAndSave(dto: UpdateUserDto, id?: number) {
    const entity = new UserEntity(dto);
    if (!id) {
      entity.createdAt = new Date().getTime();
    } else {
      entity.id = id;
    }
    if (entity.password) {
      entity.password = await HashHelper.hash(dto.password);
    }
    return this.userRepository.save(entity);
  }

  findAll(dto: UserQueryPaginatedDto) {
    const { limit, order_by, order_direction, page, search, status } = dto;
    const query = this.userRepository.createQueryBuilder('u');
    if (status) {
      query.andWhere('u.status =:status', { status });
    }
    if (limit && page) {
      query.take(limit).skip((page - 1) * limit);
    }
    if (search) {
      const formattedSearch = search
        .split(' ')
        .map((word) => word.replace(/[^\w\s]/gi, '')) // Remove any special characters
        .filter((word) => word.length > 0) // Remove any empty strings
        .map((word) => `${word}:*`) // Ensure each word is handled correctly in the search query
        .join(' | ');
      query.andWhere(`u.search_column @@ to_tsquery(:search)`, {
        search: formattedSearch,
      });
    }
    query.select([
      'u.id',
      'u.restaurantCount',
      'u.firstName',
      'u.lastName',
      'u.email',
      'u.phonenumber',
      'u.isSuperUser',
      'u.validUntil',
      'u.role',
      'u.status',
      'u.createdAt',
      'u.restaurantCount',
    ]);
    query.orderBy(`u.${order_by}`, order_direction);
    return query.getMany();
  }

  findOne(id: number) {
    return this.userRepository
      .createQueryBuilder('u')
      .leftJoinAndSelect('u.restaurants', 'r')
      .where('u.id =:id', { id })
      .getOne();
  }
}
