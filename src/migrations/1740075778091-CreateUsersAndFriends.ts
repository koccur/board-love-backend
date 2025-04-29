import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey, Table } from 'typeorm';

export class CreateUsersAndFriends740075778091 implements MigrationInterface {
  name = "CreateUsersAndFriends1740075778091";

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create user_friends join table
    await queryRunner.createTable(
      new Table({
        name: 'user_friends',
        columns: [
          {
            name: 'userId',
            type: 'integer',
            isPrimary: true,
          },
          {
            name: 'friendId',
            type: 'integer',
            isPrimary: true,
          },
        ],
      }),
      true,
    );

    // Add foreign keys
    await queryRunner.createForeignKey(
      'user_friends',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'user_friends',
      new TableForeignKey({
        columnNames: ['friendId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop join table first due to foreign key dependency
    await queryRunner.dropTable('user_friends');
    await queryRunner.dropTable('user');
  }
}
