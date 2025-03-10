import { IsArray, IsBoolean, isBoolean, IsDate, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { User } from '../user/user.entity';
import { Game } from '../game/game.entity';

export class CreateEventDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsDate()
  @Type(() => Date)
  date: Date;

  @IsInt()
  @Min(1)
  maxParticipants: number;

  @IsInt()
  organizerId: number;

  @IsOptional()
  @IsInt()
  gameId?: number;

  @IsBoolean()
  isPrivate:boolean;

  @IsArray()
  participansIds: number[];

  @IsOptional()
  @IsInt()
  spotId?:number;
}

export class UpdateEventDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  date?: Date;

  @IsOptional()
  @IsInt()
  @Min(1)
  maxParticipants?: number;

  @IsOptional()
  @IsInt()
  gameId?: number;

  @IsOptional()
  @IsInt()
  spotId?:number;

  @IsArray()
  participansIds: User[];
  @IsBoolean()
  isPrivate:boolean;

}
