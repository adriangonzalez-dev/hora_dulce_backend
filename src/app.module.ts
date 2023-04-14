import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    ProductsModule,
    MongooseModule.forRoot(String(process.env.MONGO_DB)),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
