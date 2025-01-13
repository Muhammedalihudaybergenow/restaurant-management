import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/common/dtos';

export class QueryOrderTypeDto extends PaginationDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsIn(['id', 'name', 'price'])
  order_by: string;

  @ApiProperty({
    type: String,
    required: false,
    nullable: false,
    enum: ['false', 'true'],
  })
  @IsOptional()
  @IsIn(['false', 'true'])
  isActive: string;

  @ApiProperty({
    type: Number,
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsNumber()
  restaurantId: number;
}
