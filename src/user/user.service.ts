import { Injectable, NotFoundException } from '@nestjs/common';  // If using NestJS, for example
import { InjectRepository } from '@nestjs/typeorm';  // for NestJS
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './user.interface';
import { Game } from '../game/game.entity';

@Injectable()
export class UserService {
  constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  // Create a new user
  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  // Get all users
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  // Get a user by ID
  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne({where:{id}});
  }

  // Update a user
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  // Delete a user
  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  // todo action verisy user
  // todo action add rate for user

  async getOwnedGames(userId: number): Promise<Game[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['ownedGames'], // Load related games
    });

    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    return user.ownedGames;
  }
}