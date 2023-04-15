import { BadRequestException, Injectable } from '@nestjs/common';
import { v2 as cloudinary, ConfigOptions } from 'cloudinary';

@Injectable()
export class FilesService {
  private readonly options: ConfigOptions = {
    cloud_name: String(process.env.CLOUD_NAME),
    api_key: String(process.env.API_KEY),
    api_secret: String(process.env.API_SECRET),
  };

  constructor() {
    cloudinary.config(this.options);
  }

  async uploadImage(file: Express.Multer.File, folder: string) {
    if (!file) {
      throw new BadRequestException('No se ha seleccionado ninguna imagen!');
    }
    const { secure_url } = await cloudinary.uploader.upload(file.path, {
      folder,
      format: 'webp',
    });

    return secure_url;
  }

  async deleteImage(public_id: string) {
    await cloudinary.uploader.destroy(public_id);
  }
}
