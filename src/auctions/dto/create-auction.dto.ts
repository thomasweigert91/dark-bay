import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsNumber,
  IsDate,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAuctionDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  title!: string;

  @IsString()
  description!: string;

  @IsNumber()
  @IsNotEmpty()
  startingPrice!: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endDate?: Date;
}
