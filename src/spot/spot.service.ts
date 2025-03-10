import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Spot } from './spot.entity';
import { CreateSpotDto, UpdateSpotDto } from './spot.interface';

@Injectable()
export class SpotService {
  constructor(
    @InjectRepository(Spot)
    private spotRepository: Repository<Spot>,
  ) {}

  async create(createSpotDto: CreateSpotDto): Promise<Spot> {
    const newSpot = this.spotRepository.create(createSpotDto);
    return await this.spotRepository.save(newSpot);
  }

  async findAll(): Promise<Spot[]> {
    return await this.spotRepository.find();
  }

  async findOne(id: number): Promise<Spot> {
    return await this.spotRepository.findOne({where:{id}});
  }

  async update(id: number, updateSpotDto: UpdateSpotDto): Promise<Spot> {
    await this.spotRepository.update(id, updateSpotDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.spotRepository.delete(id);
  }
}
