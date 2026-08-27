import { Expose } from 'class-transformer';

export class OfferResponseDto {
  @Expose()
  id!: string;
  @Expose()
  offer!: number;
  @Expose()
  offerDate!: Date;
}
