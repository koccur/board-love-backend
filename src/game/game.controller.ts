import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { GameService } from './game.service';
import { Game } from './game.entity';
import { CreateBoardGameDto, UpdateBoardGameDto } from './game.interface';
import { AssignGameDto } from '../user/user.interface';

@Controller('games')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  async create(@Body() createGameDto: CreateBoardGameDto): Promise<Game> {
    return this.gameService.create(createGameDto);
  }

  @Get()
  async findAll(): Promise<Game[]> {
    return this.gameService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Game> {
    return this.gameService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateGameDto: UpdateBoardGameDto,
  ): Promise<Game> {
    return this.gameService.update(id, updateGameDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.gameService.remove(id);
  }

  @Post('/assign')
  assignGame(@Body() assignGameDto: AssignGameDto) {
    return this.gameService.assignGameToUser(assignGameDto);
  }
}
