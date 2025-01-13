import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateFileDto {
  @ApiProperty({
    type: String,
    required: true,
    format: 'binary',
    nullable: false,
  })
  @IsOptional()
  file: Express.Multer.File;
}
