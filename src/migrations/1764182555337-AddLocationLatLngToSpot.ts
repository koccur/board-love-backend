import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLocationLatLngToSpot1764182555337 implements MigrationInterface {
  name = 'AddLocationLatLngToSpot1764182555337';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Add columns as NULLABLE or with a default
    await queryRunner.query(`
      ALTER TABLE "spot"
      ADD COLUMN IF NOT EXISTS "locationLat" double precision,
      ADD COLUMN IF NOT EXISTS "locationLng" double precision
    `);

    // 2. Backfill existing rows (example: temporary dummy value or geocoded value)
    // Here: set 0 for all existing NULLs – replace with real coords if you have them
    await queryRunner.query(`
      UPDATE "spot"
      SET "locationLat" = 0, "locationLng" = 0
      WHERE "locationLat" IS NULL OR "locationLng" IS NULL
    `);

    await queryRunner.query(`
      ALTER TABLE "spot" DROP COLUMN IF EXISTS "location"
    `);

    // 3. Enforce NOT NULL constraint
    await queryRunner.query(`
      ALTER TABLE "spot"
      ALTER COLUMN "locationLat" SET NOT NULL,
      ALTER COLUMN "locationLng" SET NOT NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "spot"
      DROP COLUMN IF EXISTS "locationLat",
      DROP COLUMN IF EXISTS "locationLng"
    `);
  }
}
