import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class Product extends Document {
  @Prop({
    required: true,
  })
  title: string;
  @Prop({
    required: false,
  })
  description: string;
  @Prop({
    required: true,
    default: 0,
  })
  price: number;
  @Prop({
    required: true,
    default: false,
  })
  outstanding: boolean;
  @Prop()
  image: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
