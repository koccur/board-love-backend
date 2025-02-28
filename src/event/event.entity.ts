import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../user/user.entity';
import { Game } from '../game/game.entity';
import { IsDate, IsInt, IsOptional, IsString, Min } from 'class-validator';

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

  @ManyToOne(() => Game, { nullable: true, eager: true })
  game?: Game;

  @ManyToMany(() => User, (user)=>user.eventGames)
  @JoinTable()
  participants?: User[];
  // todo location as a field
  // connected to table locations
}
