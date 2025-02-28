import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { Game } from '../game/game.entity';
import { IsOptional, Max, Min } from 'class-validator';
import { EventGame } from '../event/event.entity';

@Entity({name:'user'})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique:true})
  username: string;

  @Column({unique:true})
  email: string;

  @Column()
  password: string;
  
  @Column({default:false})
  @IsOptional()
  isVerified: boolean;

  @Column({default:1})
  @Min(1)
  @Max(5)
  raiting: number;

  @ManyToMany(() => Game, (game) => game.users)
  @JoinTable()
  ownedGames: Game[];

  @OneToMany(() => EventGame, (event) => event.organizer)
  events: EventGame[];
  //todo popraw nazwe

  @ManyToMany(() => EventGame, (eventGame) => eventGame.participants)
  eventGames: EventGame[];

}