import { ORDER_STATUS } from '../../../generated/prisma/enums';
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsPositive } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  @IsPositive()
  totalAmount: number;

  @IsNumber()
  @IsPositive()
  totalItems: number;


  @IsOptional()
  status: ORDER_STATUS = ORDER_STATUS.PENDING

  @IsBoolean()
  @IsOptional()
  paid: boolean = false;
}
