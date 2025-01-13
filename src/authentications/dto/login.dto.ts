import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: 'admin@example.com',
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: 'Hello123',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
