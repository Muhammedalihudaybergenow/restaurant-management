import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { UserRoleEnum, UserStatusEnum } from 'src/common/enums';
import { IsUnique } from 'src/common/validators';
import { UserEntity } from '../entities';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  @IsUnique(UserEntity, 'email')
  email: string;

  @ApiProperty({
    type: Number,
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(61000000, {
    message: 'phonenumber must be valid',
  })
  @Max(71999999, {
    message: 'phonenumber must be valid',
  })
  @IsUnique(UserEntity, 'phonenumber')
  phonenumber: number;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsDateString({
    strictSeparator: true,
  })
  validUntil: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsEnum(UserRoleEnum)
  role: UserRoleEnum;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsEnum(UserStatusEnum)
  status: UserStatusEnum;
}
