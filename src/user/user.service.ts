import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Like, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, FriendUser, UpdateUserDto } from './user.interface';
import { Game } from '../game/game.entity';
import { Spot } from '../spot/spot.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Spot) private readonly spotRepository: Repository<Spot>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  async findAll(name: string): Promise<User[]> {
    if (name && name.trim() !== '') {
      return await this.userRepository.find({
        where: [
          { username: ILike(`%${name}%`) },
          { email: ILike(`%${name}%`) },
        ],
      });
    }
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<FriendUser> {
    const user = await this.userRepository.findOne({ where: { id } });
    return { name: user.username, id: user.id };
  }

  async findFriends(friendName: string, userId: number): Promise<User[]> {
    return this.userRepository
      .createQueryBuilder('friend')
      .innerJoin('user_friends', 'uf', 'uf.friendId = friend.id')
      .where('uf.userId = :userId', { userId })
      .andWhere(
        friendName?.trim()
          ? '(LOWER(friend.username) LIKE :search OR LOWER(friend.email) LIKE :search)'
          : '1=1',
        friendName?.trim()
          ? { search: `%${friendName.toLowerCase()}%`, userId }
          : { userId },
      )
      .getMany();
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    return await this.userRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async getOwnedGames(userId: number): Promise<Game[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['ownedGames'],
    });

    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    return user.ownedGames;
  }

  async getFavGames(userId: number): Promise<Game[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['favGames'],
    });

    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    return user.favGames;
  }

  async addFriend(userId: number, friendId: number): Promise<User> {
    if (userId === friendId) {
      throw new Error("You can't add yourself as a friend.");
    }

    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['friends'],
    });

    const friend = await this.userRepository.findOneBy({ id: friendId });

    if (!user || !friend) {
      throw new Error('User or friend not found');
    }

    if (user.friends.some((f) => f.id === friend.id)) {
      return user;
    }

    user.friends.push(friend);
    return await this.userRepository.save(user);
  }

  async removeFriend(userId: number, friendId: number): Promise<User> {
    if (userId === friendId) {
      throw new Error("You can't remove yourself as a friend.");
    }

    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['friends'],
    });

    const friend = await this.userRepository.findOneBy({ id: friendId });

    if (!user || !friend) {
      throw new Error('User or friend not found');
    }

    if (!user.friends.filter((f) => f.id === friend.id)?.length) {
      throw new Error('That user is not a friend');
    }

    user.friends = user.friends.filter((friend) => friend.id != friendId);

    return await this.userRepository.save(user);
  }

  async getFavSpots(userId: number, spotName: string): Promise<Spot[]> {
    return this.spotRepository
      .createQueryBuilder('favouriteSpots')
      .innerJoin('user_fav_spots', 'uf', 'uf.spotId = favouriteSpots.id')
      .where('uf.userId = :userId', { userId })
      .andWhere(
        spotName?.trim()
          ? '(LOWER(favSpot.name) LIKE :search)'
          : '1=1',
          spotName?.trim()
          ? { search: `%${spotName.toLowerCase()}%`, userId }
          : { userId },
      )
      .getMany();
  }

  async removeFavouriteSpot(userId: number, spotId: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['favSpots'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const spot = await this.spotRepository.findOneBy({ id: spotId });

    if (!spot) {
      throw new NotFoundException(`Spot with ID ${spotId} not found`);
    }

    if (!user.favSpots.filter((f) => f.id === spotId)?.length) {
      throw new Error('That user has not spot in favourite');
    }

    user.favSpots = user.favSpots.filter((spot) => spot.id != spotId);

    return await this.userRepository.save(user);
  }

  async addFavouriteSpot(userId: number, spotId: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['favSpots'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const spot = await this.spotRepository.findOneBy({ id: spotId });

    if (!spot) {
      throw new NotFoundException(`Spot with ID ${spotId} not found`);
    }

    // Prevent duplicates
    if (user.favSpots.some(s => s.id === spot.id)) {
      return user; // Already added
    }

    user.favSpots.push(spot);
    return await this.userRepository.save(user);
  }
}