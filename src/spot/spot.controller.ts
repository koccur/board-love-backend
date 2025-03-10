import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { SpotService } from './spot.service';
import { Spot } from './spot.entity';
import { CreateSpotDto, UpdateSpotDto } from './spot.interface';

@Controller('spots')
export class SpotController {
  constructor(private readonly spotService: SpotService) {}

  @Post()
  async create(@Body() createSpotDto: CreateSpotDto): Promise<Spot> {
    return this.spotService.create(createSpotDto);
  }

  @Get()
  async findAll(): Promise<Spot[]> {
    return this.spotService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Spot> {
    return this.spotService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateSpotDto: UpdateSpotDto,
  ): Promise<Spot> {
    return this.spotService.update(id, updateSpotDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.spotService.remove(id);
  }
}
