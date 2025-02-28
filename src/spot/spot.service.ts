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

  // Create a new spot
  async create(createSpotDto: CreateSpotDto): Promise<Spot> {
    const newSpot = this.spotRepository.create(createSpotDto);
    return await this.spotRepository.save(newSpot);
  }

  // Get all spots
  async findAll(): Promise<Spot[]> {
    return await this.spotRepository.find();
  }

  // Get a spot by ID
  async findOne(id: number): Promise<Spot> {
    return await this.spotRepository.findOne({where:{id}});
  }

  // Update a spot
  async update(id: number, updateSpotDto: UpdateSpotDto): Promise<Spot> {
    await this.spotRepository.update(id, updateSpotDto);
    return this.findOne(id);
  }

  // Delete a spot
  async remove(id: number): Promise<void> {
    await this.spotRepository.delete(id);
  }
}
