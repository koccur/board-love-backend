import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from './game.entity';
import { CreateBoardGameDto, UpdateBoardGameDto } from './game.interface';
import { User } from '../user/user.entity';
import { AssignGameDto } from '../user/user.interface';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game) private gameRepository: Repository<Game>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async create(createGameDto: CreateBoardGameDto): Promise<Game> {
    const newGame = this.gameRepository.create(createGameDto);
    return await this.gameRepository.save(newGame);
  }

  async findAll(): Promise<Game[]> {
    return await this.gameRepository.find();
  }

  async findOne(id: number): Promise<Game> {
    return await this.gameRepository.findOne({where:{id}});
  }

  async update(id: number, updateGameDto: UpdateBoardGameDto): Promise<Game> {
    await this.gameRepository.update(id, updateGameDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.gameRepository.delete(id);
  }

  async assignGameToUser(assignGameDto: AssignGameDto): Promise<boolean> {
    const { userId, gameId } = assignGameDto;

    const game = await this.gameRepository.findOne({ where: { id: gameId } });
    if (!game) throw new NotFoundException('Game not found');

    const user = await this.userRepo.findOne({ where: { id: userId }, relations: ['ownedGames']  });
    if (!user) throw new NotFoundException('User not found');

    if (!user.ownedGames.some(g => g.id === gameId)) {
      user.ownedGames.push(game);
      await this.userRepo.save(user);
    }

    return !!user;
  }

  async unassignGameFromUser(assignGameDto: AssignGameDto): Promise<boolean> {
    const { userId, gameId } = assignGameDto;

    const game = await this.gameRepository.findOne({ where: { id: gameId } });
    if (!game) throw new NotFoundException('Game not found');

    const user = await this.userRepo.findOne({ where: { id: userId }, relations: ['ownedGames']  });
    if (!user) throw new NotFoundException('User not found');

    if (user.ownedGames.some(g => g.id === gameId)) {
      user.ownedGames = user.ownedGames.filter((game)=>game.id!==gameId);
      await this.userRepo.save(user);
    }

    return !!user;
  }

}
