import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IsEntityExists } from 'src/common/validators';
import { RestaurantEntity } from 'src/restaurants/entities';

export class CreateOrderTypeDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: Boolean,
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;

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
    type: Number,
    required: false,
    nullable: false,
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;
}
