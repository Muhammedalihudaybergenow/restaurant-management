import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty } from 'class-validator';
import { PaginationDto } from 'src/common/dtos';

export class QueryRestaurantPaginationDto extends PaginationDto {
  @ApiProperty({
    type: String,
    required: false,
    nullable: false,
    enum: ['id', 'name'],
  })
  @IsNotEmpty()
  @IsIn(['id', 'name'])
  order_by: string;
}
