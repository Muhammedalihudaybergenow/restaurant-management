import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/common/dtos';
import { UserStatusEnum } from 'src/common/enums';

export class UserQueryPaginatedDto extends PaginationDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    enum: ['id'],
    default: 'id',
  })
  @IsNotEmpty()
  @IsIn(['id'])
  order_by: string;

  @ApiProperty({
    type: String,
    required: false,
    nullable: false,
    enum: UserStatusEnum,
  })
  @IsOptional()
  @IsEnum(UserStatusEnum)
  status: UserStatusEnum;
}
