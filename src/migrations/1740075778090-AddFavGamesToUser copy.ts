import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey, Table } from 'typeorm';

export class AddFavGamesToUser1740075778090 implements MigrationInterface {
  name = "AddFavGamesToUser1740075778090";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "user_fav_games" (
            "userId" integer NOT NULL,
            "gameId" integer NOT NULL,
            CONSTRAINT "PK_user_fav_games" PRIMARY KEY ("userId", "gameId"),
            CONSTRAINT "FK_user" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE,
            CONSTRAINT "FK_game" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE CASCADE
        )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user_fav_games"`);
  }
}
