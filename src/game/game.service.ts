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

  // Create a new game
  async create(createGameDto: CreateBoardGameDto): Promise<Game> {
    const newGame = this.gameRepository.create(createGameDto);
    return await this.gameRepository.save(newGame);
  }

  // Get all games
  async findAll(): Promise<Game[]> {
    return await this.gameRepository.find();
  }

  // Get a game by ID
  async findOne(id: number): Promise<Game> {
    return await this.gameRepository.findOne({where:{id}});
  }

  // Update a game
  async update(id: number, updateGameDto: UpdateBoardGameDto): Promise<Game> {
    await this.gameRepository.update(id, updateGameDto);
    return this.findOne(id);
  }

  // Delete a game
  async remove(id: number): Promise<void> {
    await this.gameRepository.delete(id);
  }

  async assignGameToUser(assignGameDto: AssignGameDto): Promise<User> {
    const { userId, gameId } = assignGameDto;

    const game = await this.gameRepository.findOne({ where: { id: gameId } });
    if (!game) throw new NotFoundException('Game not found');

    const user = await this.userRepo.findOne({ where: { id: userId }, relations: ['ownedGames']  });
    if (!user) throw new NotFoundException('User not found');

    // Add game to user's owned games (if not already assigned)
    if (!user.ownedGames.some(g => g.id === gameId)) {
      user.ownedGames.push(game);
      await this.userRepo.save(user);
    }

    return user;
  }

}
