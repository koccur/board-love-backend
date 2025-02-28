import { IsArray, IsDate, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { User } from '../user/user.entity';

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

  @IsArray()
  participants: User[];
  // change for participansIds
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
  organizerId?: number;
  // todo remove it

  @IsOptional()
  @IsInt()
  gameId?: number;

  //add pariticipansIds, location
}
