import { Injectable } from '@nestjs/common';
import { ImageHelper } from 'src/common/helpers';
import { FileInterface } from 'src/common/interfaces';

@Injectable()
export class FilesService {
  async create(file: Express.Multer.File): Promise<FileInterface> {
    return {
      blurhash: await ImageHelper.blurhash(file.path),
      mimetype: file.mimetype,
      name: file.originalname,
      path: file.path,
      size: file.size,
    };
  }
}
