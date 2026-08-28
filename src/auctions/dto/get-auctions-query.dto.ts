import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';

export enum AuctionStatus {
    OPEN = "open",
    CLOSED = "closed"
}

export class GetAuctionsQueryDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page: number = 1;

    @IsInt()
    @Min(1)
    @IsOptional()
	@Type(() => Number)
	limit: number = 10;

    @IsOptional()
    @IsEnum(AuctionStatus)
    status?: AuctionStatus;
    
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    minPrice?: number;
    
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
	maxPrice?: number;
}

