import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';
import { EventGame } from '../event/event.entity';
import { User } from '../user/user.entity';

@Entity()
export class Spot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  location: string;

  @Column({ nullable: true })
  openDays: string;

  @Column({ nullable: true })
  openHour: number;

  @Column({ nullable: true })
  closeHour: number;
  
  @OneToMany(() => EventGame, (event) => event.spot)
  eventGames: EventGame[];

  @ManyToMany(() => User, (user) => user.favSpots)
  favouritedBy: User[];
}
