import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PRODUCT_SERVICE } from '../config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productService: ClientProxy
  ) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return createProductDto;
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productService.send({ cmd: 'find_all_products' },  paginationDto );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await firstValueFrom(this.productService.send({ cmd: 'find_one_product' }, { id }));
    } catch (error) {
        // Handle error appropriately
        throw new RpcException(error);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
  }
}
