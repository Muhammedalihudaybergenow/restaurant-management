import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities';
import { Repository } from 'typeorm';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  findOneByUserName(username: string) {
    const query = this.userRepository
      .createQueryBuilder('u')
      .leftJoin('u.restaurants', 'r');
    return query
      .select('u')
      .addSelect(['r.id', 'r.name'])
      .addSelect(['u.password'])
      .where('phonenumber::varchar = :username', { username })
      .orWhere('email = :username', { username })
      .getOne();
  }

  findUserById(id: number) {
    return this.userRepository
      .createQueryBuilder('u')
      .leftJoin('u.restaurants', 'r')
      .select('u')
      .addSelect('u.password')
      .addSelect(['r.id', 'r.name'])
      .where('u.id =:id', { id })
      .getOne();
  }
}
