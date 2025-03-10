import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AddLocationToEvent1740075778086 implements MigrationInterface {
  name = 'AddLocationToEvent1740075778086'
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'eventGamme',
      new TableColumn({
        name: 'spotId',
        type: 'int',
        isNullable: true,
      })
    );

    await queryRunner.addColumn(
      'eventGamme',
      new TableColumn({
        name: 'isPrivate',
        type: 'boolean',
        isNullable: false,
        default: false,
      })
    );

    await queryRunner.createForeignKey(
      'eventGamme',
      new TableForeignKey({
        columnNames: ['spotId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'spot',
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('eventGamme');
    const foreignKey = table.foreignKeys.find(fk => fk.columnNames.includes('spotId'));
    if (foreignKey) {
      await queryRunner.dropForeignKey('eventGamme', foreignKey);
    }
    await queryRunner.dropColumn('eventGamme', 'spotId');
    await queryRunner.dropColumn('eventGamme', 'isPrivate');

  }

}
