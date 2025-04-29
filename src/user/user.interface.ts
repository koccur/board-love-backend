import { IsInt } from 'class-validator';
import { Game } from '../game/game.entity';

export interface CreateUserDto {
    username: string;
    email: string;
    password: string;
    ownedGames:Game[];
  }

  export interface UpdateUserDto {
    username?: string;
    email?: string;
    password?: string;
    ownedGames?:Game[];
  }


export class AssignGameDto {
  @IsInt()
  userId: number;

  @IsInt()
  gameId: number;
}

export interface FriendUser{
  id:number;
  name: string;
  // consider add game list
}