import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '@nestjs/passport';
import { Auth } from 'src/auth/entities/auth.entity';
import { getUser } from 'src/auth/decorators/get-user.decorator';
import { ValidRole } from 'src/auth/decorators/Valid-role.decorator';
import { IsMongoIdPipe } from './pipes/is-mongo-id/is-mongo-id.pipe';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(AuthGuard())
  async create(
    @getUser() @ValidRole('admin_role') user: Auth,
    @Body() createProductDto: CreateProductDto,
  ) {
    const product = await this.productsService.create(
      user._id,
      createProductDto,
    );
    return product;
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', IsMongoIdPipe) id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  update(
    @getUser() @ValidRole('admin_role') user: Auth,
    @Param('id', IsMongoIdPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(
    @ValidRole('admin_role') user: Auth,
    @Param('id', IsMongoIdPipe) id: string,
  ) {
    return this.productsService.remove(id);
  }
}
