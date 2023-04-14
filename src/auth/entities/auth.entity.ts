import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Auth extends Document {
  @Prop({
    required: true,
  })
  username: string;

  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop()
  avatar: string;

  @Prop({
    required: true,
    default: 'user_role',
    enum: ['admin_role', 'user_role'],
  })
  role: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
