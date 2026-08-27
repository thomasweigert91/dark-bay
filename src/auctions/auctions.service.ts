import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { UpdateAuctionDto } from './dto/update-auction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auction } from './entities/auction.entity';

@Injectable()
export class AuctionsService {
  constructor(
    @InjectRepository(Auction)
    private readonly auctionsRepository: Repository<Auction>,
  ) {}

  async create(createAuctionDto: CreateAuctionDto) {
    const auction = this.auctionsRepository.create({
      ...createAuctionDto,
      sellerId: '6ccaafe8-c9a0-47de-9a02-106e58dcc2a0',
    });

    await this.auctionsRepository.save(auction);
  }

  async findAll() {
    return await this.auctionsRepository.find({
      order: { title: 'ASC' },
    });
  }

  async findOne(id: string) {
    return await this.auctionsRepository.findOne({
      where: { id },
      relations: {
        offers: true,
      },
    });
  }

  async update(id: string, updateAuctionDto: UpdateAuctionDto) {
    const auction = await this.auctionsRepository.preload({
      id,
      ...updateAuctionDto,
    });
    if (!auction) {
      throw new NotFoundException(`Auction #${id} not found`);
    }
    return await this.auctionsRepository.save(auction);
  }

  async remove(id: string) {
    const removed = await this.auctionsRepository.delete({ id });

    if (removed.affected == 0) {
      throw new NotFoundException('Auction not found');
    }

    return removed;
  }
}
