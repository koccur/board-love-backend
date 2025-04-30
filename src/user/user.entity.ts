import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { Game } from '../game/game.entity';
import { IsOptional, Max, Min } from 'class-validator';
import { EventGame } from '../event/event.entity';
import { Spot } from '../spot/spot.entity';

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

  // todo: double check if ownedGames and favGames working properly  
  @ManyToMany(() => Game, (game) => game.users)
  @JoinTable()
  favGames: Game[];

  @OneToMany(() => EventGame, (event) => event.organizer)
  events: EventGame[];

  @ManyToMany(() => EventGame, (eventGame) => eventGame.players)
  eventGames: EventGame[];

  @ManyToMany(() => User, { cascade: ['insert', 'update'] }) 
  @JoinTable({
     name: 'user_friends',
     joinColumn: { name: 'userId', referencedColumnName: 'id' },
     inverseJoinColumn: { name: 'friendId', referencedColumnName: 'id' },
   })
   friends: User[];

   @ManyToMany(() => Spot, { cascade: true })
   @JoinTable({
     name: 'user_fav_spots',
     joinColumn: {
       name: 'userId',
       referencedColumnName: 'id',
     },
     inverseJoinColumn: {
       name: 'spotId',
       referencedColumnName: 'id',
     },
   })
   favSpots: Spot[];
}

