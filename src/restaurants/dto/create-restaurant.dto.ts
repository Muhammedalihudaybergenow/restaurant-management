import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';
import { FileDto } from 'src/common/dtos';
import { IsEntityExists, IsUnique } from 'src/common/validators';
import { RestaurantEntity } from '../entities';
import { UserEntity } from 'src/users/entities';

export class CreateRestaurantDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  @IsUnique(RestaurantEntity, 'slug')
  slug: string;

  @ApiProperty({
    type: FileDto,
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsObject()
  file: FileDto;

  @ApiProperty({
    type: Number,
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsEntityExists(UserEntity, 'id')
  userId: number;
}
