import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Model } from 'mongoose';
import { Product } from './entities/product.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const product = new this.productModel(createProductDto);
      await product.save();
      return product;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Contacte con el administrador!');
    }
  }

  async findAll() {
    const products = await this.productModel.find();
    return products;
  }

  async findOne(id: string) {
    try {
      const product = await this.productModel.findById(id);
      if (!product) {
        throw new NotFoundException('Producto no encontrado!');
      }
      return product;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Contacte con el administrador!');
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const product = await this.findOne(id);
      product.updateOne(updateProductDto, { new: true });
      const updatedProduct = await product.save();

      return updatedProduct;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Contacte con el administrador!');
    }
  }

  remove(id: string) {
    return `This action removes a #${id} product`;
  }
}
