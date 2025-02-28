import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
  
}
