import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinColumn } from 'typeorm';
import { GameGenre } from './game-genre.entity';
import { User } from '../user/user.entity';
import { Max, Min } from 'class-validator';
import { EventGame } from '../event/event.entity';

@Entity({name:'game'})
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique:true})
  title: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => GameGenre, { eager: true }) 
  @JoinColumn({name:'game_genre'})
  genre: GameGenre;

  @Column({ nullable: true })
  releaseDate: Date;

  @Column({nullable:true})
  @Min(1)
  numberOfPlayers: number;

  @Column({ nullable: true })
  time: number;

  @Column({ nullable: true })
  @Max(99)
  ageRestriction: number;

  @ManyToMany(() => User, (user) => user.ownedGames)
  users: User[];

  @ManyToMany(() => EventGame, (eventGame) => eventGame.games)
  eventGames: EventGame[];
}

