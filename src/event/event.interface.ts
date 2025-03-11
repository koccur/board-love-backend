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
  @IsArray()
  @IsInt({ each: true })
  gameIds?: number[];

  @IsBoolean()
  isPrivate:boolean;

  @IsArray()
  participantsIds: number[];

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
  @IsArray()
  @IsInt({ each: true })
  gameIds?: number[];

  @IsOptional()
  @IsInt()
  spotId?:number;

  @IsArray()
  participantsIds: User[];
  @IsBoolean()
  isPrivate:boolean;

}
