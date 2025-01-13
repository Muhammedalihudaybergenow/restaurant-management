import { ApiProperty } from '@nestjs/swagger';
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    type: Number,
    required: true,
    nullable: false,
    example: 20,
  })
  @IsNumber()
  @IsNotEmpty()
  limit: number;

  @ApiProperty({
    type: Number,
    required: true,
    nullable: false,
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  page: number;

  @ApiProperty({
    type: String,
    required: false,
    nullable: false,
  })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    enum: ['ASC', 'DESC'],
    default: 'DESC',
  })
  @IsIn(['ASC', 'DESC'])
  @IsOptional()
  order_direction: 'ASC' | 'DESC';
}
