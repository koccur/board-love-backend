import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto, FriendUser, UpdateUserDto } from './user.interface';
import { Game } from '../game/game.entity';

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

  // todo: via loggedToken not it and fix model
  @Post(':id/add-friend')
  async addFriend(@Param('id') id: number,
  @Body() dto: any): Promise<User> {
    return this.userService.addFriend(id,dto.friendId);
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


}
