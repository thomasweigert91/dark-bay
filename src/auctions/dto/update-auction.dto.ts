import { IsString, MaxLength, IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateAuctionDto {
  @IsString()
  @IsOptional()
  @MaxLength(120)
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endDate?: Date;
}
