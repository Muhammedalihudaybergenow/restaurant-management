import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class FileDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: 'U*PGHaof?wWDxZfkR+oK_3fQIUoKR+ays.ay',
  })
  @IsNotEmpty()
  @IsString()
  blurhash: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: 'image/avif',
  })
  @IsNotEmpty()
  @IsString()
  mimetype: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '3d-black-gift-box-with-gold-ribbon-bow_107791-17735.jpg.avif',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example:
      'uploads/2025-0/3d-black-gift-box-with-gold-ribbon-bow_107791-17735-8e53.avif',
  })
  @IsString()
  @IsNotEmpty()
  path: string;

  @ApiProperty({
    type: Number,
    required: true,
    nullable: false,
    example: 7268,
  })
  @IsNotEmpty()
  @IsNumber()
  size: number;
}
