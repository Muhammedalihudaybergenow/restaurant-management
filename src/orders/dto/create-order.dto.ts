import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { OrderStatusEnum } from 'src/common/enums';
import { IsEntityExists } from 'src/common/validators';
import { OrderTypeEntity } from 'src/order-types/entities';

export class CreateOrderDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty({
    type: Number,
    required: true,
    nullable: false,
  })
  @IsNumber()
  @IsNotEmpty()
  startTime: number;

  @ApiProperty({
    type: Number,
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsNumber()
  endTime: number;

  @ApiProperty({
    type: Number,
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsEntityExists(OrderTypeEntity, 'id')
  orderTypeId: number;

  @ApiProperty({
    type: String,
    required: false,
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  note: string;

  @ApiProperty({
    type: String,
    required: false,
    nullable: false,
  })
  @IsOptional()
  @IsString()
  comment: string;

  @ApiProperty({
    type: Number,
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsNumber()
  chairCount: number;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  phonenumber: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsEnum(OrderStatusEnum)
  status: OrderStatusEnum;
}
