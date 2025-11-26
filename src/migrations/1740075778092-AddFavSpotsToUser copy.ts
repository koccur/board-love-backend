import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey, Table } from 'typeorm';

export class AddFavSpotsToUser1740075778092 implements MigrationInterface {
  name = "AddFavSpotsToUser1740075778092";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "user_fav_spots" (
            "userId" integer NOT NULL,
            "spotId" integer NOT NULL,
            CONSTRAINT "PK_user_fav_spots" PRIMARY KEY ("userId", "spotId"),
            CONSTRAINT "FK_user" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE,
            CONSTRAINT "FK_spot" FOREIGN KEY ("spotId") REFERENCES "spot"("id") ON DELETE CASCADE
        )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user_fav_spots"`);
  }
}
