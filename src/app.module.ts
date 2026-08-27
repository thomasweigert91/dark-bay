import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuctionsModule } from './auctions/auctions.module';
import { OffersModule } from './offers/offers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auction } from './auctions/entities/auction.entity';
import { Offer } from './offers/entities/offer.entity';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { Middleware } from './middlewares/middleware';

@Module({
  imports: [
    AuctionsModule,
    OffersModule,
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'data/dark-bay.sqlite',
      entities: [Auction, Offer, User],
      synchronize: true,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(Middleware).forRoutes('/auctions');
  }
}
