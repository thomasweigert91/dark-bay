import { Expose, Type } from 'class-transformer';

import {AuctionResponseDto} from "./auction-response-dto"

export class PaginatedAuctionResponseDto {
  @Expose()
  @Type(() => AuctionResponseDto)
  data!: AuctionResponseDto[];
  @Expose()
  meta!: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}