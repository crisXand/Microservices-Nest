import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { envs, ORDER_SERVICE } from 'src/config';
import { ClientsModule, Transport } from '@nestjs/microservices'

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [
    ClientsModule.register([{
      name: ORDER_SERVICE,
      transport: Transport.TCP,
      options: {
        port: envs.orderport,
        host: envs.orderhost
      }
    }])
  ]
})
export class OrdersModule {}
