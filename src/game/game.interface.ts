import { IsString, IsEnum, IsInt, IsDate, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { GameGenre } from './game-genre.entity';

export class CreateBoardGameDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  genre: GameGenre;

  @IsDate()
  @Type(() => Date)
  releaseDate: Date;

  @IsInt()
  @Min(1)
  numberOfPlayers: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  time?: number;  // Time in minutes

  @IsInt()
  @IsOptional()
  @Min(0)
  ageRestriction?: number;
}

export class UpdateBoardGameDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  genre?: GameGenre;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  releaseDate?: Date;

  @IsOptional()
  @IsInt()
  @Min(1)
  numberOfPlayers?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  time?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  ageRestriction?: number;
}

export class BoardGameResponseDto {
  @IsInt()
  id: number;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  genre: GameGenre;

  @IsDate()
  releaseDate: Date;

  @IsInt()
  numberOfPlayers: number;

  @IsInt()
  time: number;

  @IsInt()
  ageRestriction: number;
}
