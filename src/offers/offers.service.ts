import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOfferDto } from './dto/create-offer.dto';
import { Repository } from 'typeorm';
import { Offer } from './entities/offer.entity';
import { Auction } from 'src/auctions/entities/auction.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
    @InjectRepository(Auction)
    private readonly auctionRepository: Repository<Auction>,
  ) {}

  async create(auctionId: string, createOfferDto: CreateOfferDto) {
    const auction = await this.auctionRepository.findOneBy({ id: auctionId });

    if (!auction) {
      throw new NotFoundException('The auction not found');
    }

    const isExpired = new Date() > auction.endDate;

    if (isExpired) {
      throw new ConflictException('The auction is ended');
    }

    const currentHighest = auction.currentPrice ?? auction.startingPrice

    if (createOfferDto.offer <= currentHighest) {
      throw new ConflictException("The bid should be greater than the current price")
    }

    const offer = this.offerRepository.create({ auctionId, ...createOfferDto });

    const savedOffer = await this.offerRepository.save(offer);
    
    auction.currentPrice = createOfferDto.offer
    await this.auctionRepository.save(auction)

    return savedOffer
  }

  // findAll() {
  //   return `This action returns all offers`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} offer`;
  // }

  // update(id: number, updateOfferDto: UpdateOfferDto) {
  //   return `This action updates a #${id} offer`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} offer`;
  // }
}
