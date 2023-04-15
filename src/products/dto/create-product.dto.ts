import {
  IsString,
  IsNumber,
  Min,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsBoolean()
  outstanding: boolean;

  @IsString()
  @IsOptional()
  image: string;
}
