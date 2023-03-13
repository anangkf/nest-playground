import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDto } from './dto/product.dto';
import { Product, ProductDocument } from './product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async getAll(): Promise<Product[]> {
    return this.productModel.find();
  }

  async create(product: ProductDto) {
    if (!product.name || !product.price || !product) {
      throw new BadRequestException('Bad Request', {
        cause: new Error(),
        description: 'either property name or price is missing',
      });
    }

    const newProduct = new this.productModel(product);
    return newProduct.save();
  }
}
