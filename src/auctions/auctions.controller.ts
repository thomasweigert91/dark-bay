import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  SerializeOptions,
  HttpCode,
  Query,
} from '@nestjs/common';
import { AuctionsService } from './auctions.service';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { UpdateAuctionDto } from './dto/update-auction.dto';
import { AuctionResponseDto } from './dto/auction-response-dto';
import { GetAuctionsQueryDto } from './dto/get-auctions-query.dto';
import { PaginatedAuctionResponseDto } from './dto/paginated-auction-response.dto';

@Controller('auctions')
export class AuctionsController {
  constructor(private readonly auctionsService: AuctionsService) {}

  @SerializeOptions({ type: AuctionResponseDto })
  @Post()
  create(@Body() createAuctionDto: CreateAuctionDto) {
    return this.auctionsService.create(createAuctionDto);
  }

  @SerializeOptions({ type: PaginatedAuctionResponseDto })
  @Get()
  findAll(@Query() query: GetAuctionsQueryDto) {
    return this.auctionsService.findAll(query);
  }

  @SerializeOptions({ type: AuctionResponseDto })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.auctionsService.findOne(id);
  }

  @SerializeOptions({ type: AuctionResponseDto })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuctionDto: UpdateAuctionDto) {
    return this.auctionsService.update(id, updateAuctionDto);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.auctionsService.remove(id);
  }
}

