import { Module } from '@nestjs/common';
import { SpotService } from './spot.service';
import { SpotController } from './spot.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Spot } from './spot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Spot])],
  providers: [SpotService],
  controllers: [SpotController],
})
export class SpotModule {}
