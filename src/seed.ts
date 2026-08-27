import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Auction } from './auctions/entities/auction.entity';
import { Offer } from './offers/entities/offer.entity';
import { User } from './users/entities/user.entity';

const dataSource = new DataSource({
  type: 'better-sqlite3',
  database: 'data/dark-bay.sqlite',
  entities: [Auction, Offer, User],
  synchronize: true,
});

async function seed() {
  await dataSource.initialize();
  console.log('Connected to SQLite DB at data/dark-bay.sqlite');

  const userRepo = dataSource.getRepository(User);
  const auctionRepo = dataSource.getRepository(Auction);
  const offerRepo = dataSource.getRepository(Offer);

  // Clear existing data safely
  await offerRepo.query('DELETE FROM offers');
  await auctionRepo.query('DELETE FROM auctions');
  await userRepo.query('DELETE FROM users');

  // Create sample users
  const [user1, user2] = await userRepo.save([
    userRepo.create({
      name: 'Alice',
      hashedPassword: '$2b$10$e8w6Q0.xyz.fakehash1',
    }),
    userRepo.create({
      name: 'Bob',
      hashedPassword: '$2b$10$e8w6Q0.xyz.fakehash2',
    }),
  ]);
  console.log('✅ Users inserted');

  const now = new Date();

  // Create 4 auctions
  const [a1, a2, a3, a4] = await auctionRepo.save([
    auctionRepo.create({
      title: 'Vintage Leather Jacket',
      description: 'A well-preserved 1970s leather jacket in dark brown.',
      startingPrice: 80,
      sellerId: user1.id,
      startDate: now,
      endDate: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000),
    }),
    auctionRepo.create({
      title: 'Mechanical Keyboard - IBM Model M',
      description: 'Classic clicky keyboard from 1987, fully functional.',
      startingPrice: 120,
      sellerId: user1.id,
      startDate: now,
      endDate: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000),
    }),
    auctionRepo.create({
      title: 'First Edition Novel - Dune',
      description: 'Original 1965 first edition of Frank Herberts Dune.',
      startingPrice: 500,
      sellerId: user2.id,
      startDate: now,
      endDate: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
    }),
    auctionRepo.create({
      title: 'Road Bike - Trek Emonda SL5',
      description: '2021 model, 56cm frame, carbon fork, excellent condition.',
      startingPrice: 900,
      sellerId: user2.id,
      startDate: now,
      endDate: new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000),
    }),
  ]);
  console.log('✅ 4 auctions inserted');

  // Create 5 bids (offers)
  await offerRepo.save([
    offerRepo.create({ offer: 95, auctionId: a1.id }),
    offerRepo.create({ offer: 110, auctionId: a1.id }),
    offerRepo.create({ offer: 145, auctionId: a2.id }),
    offerRepo.create({ offer: 620, auctionId: a3.id }),
    offerRepo.create({ offer: 950, auctionId: a4.id }),
  ]);
  console.log('✅ 5 bids (offers) inserted');

  await dataSource.destroy();
  console.log('🎉 Seeding complete!');
}

seed().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
