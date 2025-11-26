import { IsInt } from 'class-validator';
import { Game } from '../game/game.entity';

export interface CreateUserDto {
  username: string;
  email: string;
  password: string;
  ownedGames: Game[];
}

export interface UpdateUserDto {
  username?: string;
  email?: string;
  ownedGames?: Game[];
}

export interface UpdatePasswordDto {
  password: string;
  email: string;
}

export class AssignGameDto {
  @IsInt()
  userId: number;

  @IsInt()
  gameId: number;
}

export class AuthUser {
  email: string;
  id: number;
  password: string;
  username: string;
}

export interface FriendUser {
  id: number;
  name: string;
  // consider add game list
}