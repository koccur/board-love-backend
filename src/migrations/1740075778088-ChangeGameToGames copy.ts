import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey, Table } from 'typeorm';

export class ChangeGameToGames1740075778088 implements MigrationInterface {
  name="ChangeGameToGames1740075778088";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('eventGamme', 'gameId');

    await queryRunner.createTable(
      new Table({
        name: 'event_game_games_game',
        columns: [
          {
            name: 'eventGameId',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'gameId',
            type: 'int',
            isPrimary: true,
          },
        ],
      }),
      true
    );

    // Add foreign keys for eventGameId and gameId
    await queryRunner.createForeignKey(
      'event_game_games_game',
      new TableForeignKey({
        columnNames: ['eventGameId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'eventGamme',
        onDelete: 'CASCADE',
      })
    );

    await queryRunner.createForeignKey(
      'event_game_games_game',
      new TableForeignKey({
        columnNames: ['gameId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'game',
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('event_game_games_game');

    await queryRunner.addColumn(
      'eventGamme',
      new TableColumn({
        name: 'game',
        type: 'varchar',
        isNullable: true,
      })
    );
  }
}
