import {
  Controller,
  Post,
  Body,
  Param,
  SerializeOptions,
} from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { OfferResponseDto } from './dto/offer-reponse.dto';

@Controller('auctions/:id/offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @SerializeOptions({ type: OfferResponseDto })
  @Post()
  create(@Param('id') id: string, @Body() createOfferDto: CreateOfferDto) {
    return this.offersService.create(id, createOfferDto);
  }
}
