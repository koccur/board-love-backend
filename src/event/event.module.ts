import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from '../game/game.entity';
import { User } from '../user/user.entity';
import { EventGame } from './event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EventGame, User, Game])],
  controllers: [EventController],
  providers: [EventService]
})
export class EventModule {}
