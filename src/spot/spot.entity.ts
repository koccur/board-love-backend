import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { EventGame } from '../event/event.entity';

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
}
