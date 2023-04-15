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

  async create(id: string, createProductDto: CreateProductDto) {
    let product = await this.productModel.findOne({
      title: createProductDto.title.toLocaleLowerCase(),
    });
    if (product) {
      throw new BadRequestException('El producto ya existe!');
    }
    createProductDto.title = createProductDto.title.toLocaleLowerCase();
    product = new this.productModel(createProductDto);
    product.createdBy = id;
    await product.save();
    return product;
  }

  async findAll() {
    try {
      const products = await this.productModel.find();
      return products;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Contacte con el administrador!');
    }
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new NotFoundException('Producto no encontrado!');
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);
    const { modifiedCount } = await product.updateOne(updateProductDto, {
      new: true,
    });

    if (modifiedCount === 0) {
      throw new BadRequestException('Producto no actualizado!');
    }

    const updatedProduct = await this.findOne(id);

    return updatedProduct;
  }

  remove(id: string) {
    const removedProduct = this.productModel.findByIdAndDelete(id);
    return removedProduct;
  }
}
