import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers/fileFilter.helper';
import { fileNamer } from './helpers/fileNamer.helper';
import { diskStorage } from 'multer';
import { v2 as cloudinary, ConfigOptions } from 'cloudinary';

@Controller('files')
export class FilesController {
  private readonly options: ConfigOptions = {
    cloud_name: String(process.env.CLOUD_NAME),
    api_key: String(process.env.API_KEY),
    api_secret: String(process.env.API_SECRET),
  };

  constructor(private readonly filesService: FilesService) {
    cloudinary.config(this.options);
  }

  @Post('product')
  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter,
      storage: diskStorage({
        filename: fileNamer,
      }),
    }),
  )
  async uploadProductImage(@UploadedFile() file: Express.Multer.File) {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: 'products',
      format: 'webp',
    });
    return result;
  }
}
