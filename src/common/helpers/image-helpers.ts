import { encode } from 'blurhash';
import { extname } from 'path';
import * as sharp from 'sharp';
export class ImageHelper {
  static editFileName(req: any, file: any, callback: any) {
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    const randomName = Array(4)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    return callback(null, `${name}-${randomName}${fileExtName}`);
  }

  static imageFileFilter(
    req: Request,
    file: Express.Multer.File,
    callback: any,
  ) {
    if (!file.originalname.match(/\.(jpg|png|mp4|gif|webp|jpeg)/)) {
      return callback(new Error('Only image files are allowed'), false);
    }
    callback(null, true);
  }
  static blurhash(path: any) {
    return new Promise<string>((resolve, reject) => {
      sharp(path)
        .raw()
        .ensureAlpha()
        .resize(200, 200, { fit: 'inside' })
        .toBuffer((err: any, buffer: any, { width, height }) => {
          if (err) return reject(err);
          resolve(encode(new Uint8ClampedArray(buffer), width, height, 4, 4));
        });
    });
  }
}
