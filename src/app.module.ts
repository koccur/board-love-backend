import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { GameModule } from './game/game.module';
import { SpotModule } from './spot/spot.module';
import { Game } from './game/game.entity';
import { Spot } from './spot/spot.entity';
import { User } from './user/user.entity';
import { GameGenre } from './game/game-genre.entity';
import { EventModule } from './event/event.module';
import { EventGame } from './event/event.entity';


@Module({
  imports: [
    UserModule,
    GameModule,
    SpotModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5432,
      database: "boardlove_db",
      username: "postgres",
      password: "admin666ADMIN123",
      synchronize: true,
      host: 'localhost',
      entities:[Game,Spot,User,EventGame,GameGenre]
    }),
    EventModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
