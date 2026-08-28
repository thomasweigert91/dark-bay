import { Expose, Type } from 'class-transformer';
import { OfferResponseDto } from 'src/offers/dto/offer-reponse.dto';

export class AuctionResponseDto {
  @Expose()
  id!: string;
  @Expose()
  title!: string;
  @Expose()
  description!: string;
  @Expose()
  startingPrice!: number;
  @Expose()
  currentPrice!: number;
  @Expose()
  sellerId!: string;
  @Expose()
  startDate!: Date;
  @Expose()
  endDate!: Date;
  @Expose()
  @Type(() => OfferResponseDto)
  offers!: OfferResponseDto[];
}
