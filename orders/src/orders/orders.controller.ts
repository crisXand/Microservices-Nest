import { Controller } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}


  @MessagePattern({cmd: "createOrder"})
  async create(@Payload() createOrderDto: CreateOrderDto) {
    return await this.ordersService.create({ ...createOrderDto});
  }

  @MessagePattern({cmd: "findAllOrders"})
  findAll() {
    return this.ordersService.findAll();
  }

  @MessagePattern({cmd : "findOneOrder"})
  findOne(@Payload('id') id: string) {
    return this.ordersService.findOne(+id);
  }

}
