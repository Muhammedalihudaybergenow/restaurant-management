import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { OrderStatusEnum } from 'src/common/enums';
import { IsEntityExists } from 'src/common/validators';
import { RestaurantEntity } from 'src/restaurants/entities';

export class QueryOrderPaginationDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    enum: ['id', 'firstName'],
  })
  @IsString()
  @IsNotEmpty()
  order_by: string;

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
  @IsNotEmpty()
  order_direction: 'ASC' | 'DESC';
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsDateString()
  minDate: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsDateString()
  maxDate: string;

  @ApiProperty({
    type: Number,
    required: false,
    nullable: false,
  })
  @IsOptional()
  @IsNumber()
  minCreatedAt: string;

  @ApiProperty({
    type: Number,
    required: false,
    nullable: false,
  })
  @IsOptional()
  @IsNumber()
  maxCreatedAt: number;

  @ApiProperty({
    type: Number,
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsEntityExists(RestaurantEntity, 'id')
  restaurantId: number;

  @ApiProperty({
    type: String,
    required: false,
    nullable: false,
  })
  @IsOptional()
  @IsEnum(OrderStatusEnum)
  status: OrderStatusEnum;
}
