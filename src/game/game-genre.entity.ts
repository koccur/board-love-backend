import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum BoardGameGenres {
  STRATEGY = 'STRATEGY',
  PARTY = 'PARTY',
  COOPERATIVE = 'COOPERATIVE',
  FAMILY = 'FAMILY',
  DECK_BUILDING = 'DECK_BUILDING',
  ROLE_PLAYING = 'ROLE_PLAYING',
  WAR = 'WAR',
  ABSTRACT = 'ABSTRACT',
  THEMATIC = 'THEMATIC',
  EUROGAME = 'EUROGAME',
  DEDUCTION = 'DEDUCTION',
  WORD = 'WORD',
}

@Entity({ name: 'game_genre' }) // Creates 'game_genre' table
export class GameGenre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: BoardGameGenres,
    unique: true,
  })
  name: BoardGameGenres;
}
