import { Type } from 'class-transformer';
import { IsString, Min, IsNumber } from 'class-validator';

export class CreateProductDto {
    @IsString()
    public name: string;
    
    @IsNumber({ maxDecimalPlaces: 2})
    @Min(0)
    @Type(() => Number)
    public price: number;

}
