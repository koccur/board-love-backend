import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto, FriendUser, UpdateUserDto } from './user.interface';
import { Game } from '../game/game.entity';
import { Spot } from '../spot/spot.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get()
  async findAll(@Query('name') name?: string): Promise<User[]> {
    return this.userService.findAll(name);
  }
  @Get('/find-friends')
  async findFriends(@Query('id') userId: number,
    @Query('friendName') friendName: string): Promise<User[]> {
    return this.userService.findFriends(friendName, userId);
  }

  @Get('/favspots')
  async findFavSpots(@Query('userId') userId: number,
    @Query('name') spotName: string): Promise<Spot[]> {
    return this.userService.getFavSpots(userId, spotName);
  }

  // todo: via loggedToken not it and fix model
  @Post(':id/add-friend')
  async addFriend(@Param('id') id: number,
  @Body() dto: any): Promise<User> {
    return this.userService.addFriend(id,dto.friendId);
  }

    // todo: via loggedToken not it and fix model
    @Delete(':id/remove-friend/:friendId')
    async removeFriend(@Param('id') id: number,
    @Param('friendId') friendId: number): Promise<User> {
      return this.userService.removeFriend(id,friendId);
    }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<FriendUser> {
    return this.userService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.userService.remove(id);
  }

  @Get(':id/owned-games')
  async getUserOwnedGames(@Param('id', ParseIntPipe) userId: number): Promise<Game[]> {
    return this.userService.getOwnedGames(userId);
  }

  @Get(':id/fav-games')
  async getUserFavGames(@Param('id', ParseIntPipe) userId: number): Promise<Game[]> {
    return this.userService.getFavGames(userId);
  }

    // todo consider move all related to loggedUser data to userService 
  // todo: via loggedToken not it and fix model
  @Post(':userId/fav-spot')
  async addFavouriteSpot(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() dto: any,
  ): Promise<User> {
    return this.userService.addFavouriteSpot(userId, dto.spotId);
  }
  
  @Delete(':userId/fav-spot/:spotId')
  async removeFavouriteSpot(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('spotId', ParseIntPipe) spotId: number,
  ): Promise<User> {
    return this.userService.removeFavouriteSpot(userId, spotId);
  }

}
