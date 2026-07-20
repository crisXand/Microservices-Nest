import { Injectable, HttpStatus } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService){}
  
  async create(createProductDto: CreateProductDto) {
    return await this.prisma.product.create({
      data: createProductDto
    })
  }

  async findAll( paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    const totalProducts = await this.prisma.product.count();
    const lastPage = Math.ceil(totalProducts / limit);

    return {
      data: await this.prisma.product.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: { available: true },
      }),
      meta: {
        totalItems: totalProducts,
        lastPage,
      },
    };
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findFirst({
      where: { id, available: true}
    });
    if (product){
      return product
    }
    console.log("product not found")
    throw new RpcException({
      status: HttpStatus.NOT_FOUND,
      message: `Product with id ${id} not found`,
    });
    
  }

  update(updateProductDto: UpdateProductDto) {
    const { id, ...data } = updateProductDto;
    this.findOne(id)
    this.prisma.product.update({
      where: { id },
      data: data
    })

  }

  async remove(id: number) {
    await this.findOne(id)
    // return this.prisma.product.delete({
    //   where: {id}
    // })
    return this.prisma.product.update({
      where: {id},
      data: {
        available: false
      }
    })
  }
}
