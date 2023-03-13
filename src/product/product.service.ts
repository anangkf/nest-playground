import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
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
    // DEPRECATED after added global error exception filter
    // if (!product.name || !product.price || !product) {
    //   throw new BadRequestException('Bad Request', {
    //     cause: new Error(),
    //     description: 'either property name or price is missing',
    //   });
    // }

    const newProduct = new this.productModel(product);
    return newProduct.save();
  }

  async getById(id: string) {
    const product = await this.productModel.findById(id);

    if (!product) {
      throw new NotFoundException();
    }
    return product;
  }

  async updateById(id: string, body: ProductDto) {
    if (!Object.keys(body).length) {
      throw new BadRequestException();
    }
    const data = await this.productModel.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
      context: 'query',
    });

    if (!data) {
      throw new NotFoundException();
    }
    return data;
  }

  async deleteById(id: string) {
    const data = await this.productModel.findByIdAndRemove(id);

    if (!data) {
      throw new NotFoundException();
    }
    return data;
  }
}
