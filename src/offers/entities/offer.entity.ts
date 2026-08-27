import { Auction } from '../../auctions/entities/auction.entity';
import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';

@Entity('offers')
export class Offer {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  offer!: number;

  @CreateDateColumn({ type: 'datetime' })
  offerDate!: Date;

  @Column()
  auctionId!: string;
  @ManyToOne(() => Auction, (auction) => auction.offers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'auctionId' })
  auction!: Auction;
}
