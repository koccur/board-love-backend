import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../user/user.entity';
import { Game } from '../game/game.entity';
import { IsDate, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Spot } from '../spot/spot.entity';

@Entity({ name: 'eventGamme' })
export class EventGame {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  title: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Column()
  @IsDate()
  date: Date;

  @Column()
  @IsInt()
  @Min(1)
  maxParticipants: number;

  @ManyToOne(() => User, (user) => user.eventGames, { nullable: false })
  @JoinTable({name:'organizerId'})
  organizer: User;

  @ManyToMany(() => Game, (game) => game.eventGames, { cascade: true })
  @JoinTable()
  games: Game[];

  @ManyToMany(() => User, (user)=>user.eventGames)
  @JoinTable()
  players?: User[];

  @Column({ type: 'boolean', default: false })
  isPrivate: boolean;

  @ManyToOne(() => Spot, (location) => location.eventGames, { nullable: true, onDelete: 'CASCADE' })
  spot: Spot;
}
