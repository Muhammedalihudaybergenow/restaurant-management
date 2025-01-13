import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { UserQueryPaginatedDto } from '../dto/user-query.dto';
import { UserResponseDto } from '../dto/user-response.dto';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async create(dto: CreateUserDto) {
    const user = await this.userRepository.createAndSave(dto);
    return new UserResponseDto(user);
  }

  update(dto: UpdateUserDto, id: number) {
    return this.userRepository.createAndSave(dto, id);
  }

  findAll(dto: UserQueryPaginatedDto) {
    return this.userRepository.findAll(dto);
  }

  findOne(id: number) {
    return this.userRepository.findOne(id);
  }
}
