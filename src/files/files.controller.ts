import {
  Controller,
  Delete,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers/fileFilter.helper';
import { fileNamer } from './helpers/fileNamer.helper';
import { diskStorage } from 'multer';
import { AuthGuard } from '@nestjs/passport';
import { getUser } from 'src/auth/decorators/get-user.decorator';
import { ValidRole } from 'src/auth/decorators/Valid-role.decorator';
import { Auth } from 'src/auth/entities/auth.entity';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('product')
  @UseGuards(AuthGuard())
  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter,
      storage: diskStorage({
        filename: fileNamer,
      }),
    }),
  )
  async uploadProductImage(
    @getUser() @ValidRole('admin_role') user: Auth,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.filesService.uploadImage(file, 'products');
  }

  @Delete('product/:image')
  async deleteProductImage(@Param('image') image: string) {
    return await this.filesService.deleteImage(`products/${image}`);
  }
}
