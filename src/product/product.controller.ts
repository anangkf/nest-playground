import { Controller, Get, Post, Param, Put } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import ParamsWithId from 'src/utils/ParamsWithId';
import { ProductDto } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getAllProduct() {
    return this.productService.getAll();
  }

  @Post()
  addProduct(@Body() product: ProductDto) {
    return this.productService.create(product);
  }

  @Get(':id')
  getProductById(@Param() { id }: ParamsWithId) {
    return this.productService.getById(id);
  }

  @Put(':id')
  updateProductById(@Param() { id }: ParamsWithId, @Body() body: ProductDto) {
    return this.productService.updateById(id, body);
  }
}
