import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FilesService } from '../services/files.service';
import { CreateFileDto } from '../dto/create-file.dto';
import { ApiConsumes } from '@nestjs/swagger';
import { Permissions } from 'src/common/decorators';
import { UserRoleEnum } from 'src/common/enums';
import { FileInterceptor } from '@nestjs/platform-express';
import { DateHelpers } from 'src/common/helpers';
import { diskStorage } from 'multer';
import { ImageHelper } from 'src/common/helpers';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @Permissions(UserRoleEnum.ADMIN)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: `./uploads/${DateHelpers.getFileDate()}`,
        filename: ImageHelper.editFileName,
      }),
    }),
  )
  create(
    @Body() createFileDto: CreateFileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.filesService.create(file);
  }
}
