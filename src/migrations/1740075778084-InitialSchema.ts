import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1740075778084 implements MigrationInterface {
    name = 'InitialSchema1740075778084'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."game_genre_name_enum" AS ENUM('STRATEGY', 'PARTY', 'COOPERATIVE', 'FAMILY', 'DECK_BUILDING', 'ROLE_PLAYING', 'WAR', 'ABSTRACT', 'THEMATIC', 'EUROGAME', 'DEDUCTION', 'WORD')`);
        await queryRunner.query(`CREATE TABLE "game_genre" ("id" SERIAL NOT NULL, "name" "public"."game_genre_name_enum" NOT NULL, CONSTRAINT "UQ_4292330170215eedb0d2623cbb0" UNIQUE ("name"), CONSTRAINT "PK_f9cca8f92d23a02752da15872d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "game" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying, "releaseDate" TIMESTAMP, "numberOfPlayers" integer, "time" integer, "ageRestriction" integer, "game_genre" integer, CONSTRAINT "UQ_0152ed47a9e8963b5aaceb51e77" UNIQUE ("title"), CONSTRAINT "PK_352a30652cd352f552fef73dec5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "eventGamme" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying, "date" TIMESTAMP NOT NULL, "maxParticipants" integer NOT NULL, "organizerId" integer, "gameId" integer, CONSTRAINT "PK_b78f3ca3f374ac4c061413a5fc2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isVerified" boolean NOT NULL DEFAULT false, "raiting" integer NOT NULL DEFAULT '1', "eventsId" integer, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "spot" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "location" character varying NOT NULL, "openDays" character varying, "openHour" integer, "closeHour" integer, CONSTRAINT "PK_f2a0a47e5ae78713daf83a5f7b0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "event_gamme_participants_user" ("eventGammeId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_f0511aebef8d73a718859a5c31b" PRIMARY KEY ("eventGammeId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_58288de8661c13a28b6ac1f251" ON "event_gamme_participants_user" ("eventGammeId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7e7ed62376381416e4cb66e2ec" ON "event_gamme_participants_user" ("userId") `);
        await queryRunner.query(`CREATE TABLE "user_owned_games_game" ("userId" integer NOT NULL, "gameId" integer NOT NULL, CONSTRAINT "PK_31ad03a47e331814ed5253bb53e" PRIMARY KEY ("userId", "gameId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_28cab13bcc4cd62b1682d7a765" ON "user_owned_games_game" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e0eb817aeff531dcb389c2097d" ON "user_owned_games_game" ("gameId") `);
        await queryRunner.query(`ALTER TABLE "game" ADD CONSTRAINT "FK_e158af77fc868da1b37fff0f8f0" FOREIGN KEY ("game_genre") REFERENCES "game_genre"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "eventGamme" ADD CONSTRAINT "FK_8d2d178a225b6d7036b81b9156e" FOREIGN KEY ("organizerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "eventGamme" ADD CONSTRAINT "FK_852430431d24ce04a6ea0b7cc6c" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_580171ee53de81fde6754c30bdc" FOREIGN KEY ("eventsId") REFERENCES "eventGamme"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event_gamme_participants_user" ADD CONSTRAINT "FK_58288de8661c13a28b6ac1f2511" FOREIGN KEY ("eventGammeId") REFERENCES "eventGamme"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "event_gamme_participants_user" ADD CONSTRAINT "FK_7e7ed62376381416e4cb66e2ec4" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_owned_games_game" ADD CONSTRAINT "FK_28cab13bcc4cd62b1682d7a7651" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_owned_games_game" ADD CONSTRAINT "FK_e0eb817aeff531dcb389c2097d3" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_owned_games_game" DROP CONSTRAINT "FK_e0eb817aeff531dcb389c2097d3"`);
        await queryRunner.query(`ALTER TABLE "user_owned_games_game" DROP CONSTRAINT "FK_28cab13bcc4cd62b1682d7a7651"`);
        await queryRunner.query(`ALTER TABLE "event_gamme_participants_user" DROP CONSTRAINT "FK_7e7ed62376381416e4cb66e2ec4"`);
        await queryRunner.query(`ALTER TABLE "event_gamme_participants_user" DROP CONSTRAINT "FK_58288de8661c13a28b6ac1f2511"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_580171ee53de81fde6754c30bdc"`);
        await queryRunner.query(`ALTER TABLE "eventGamme" DROP CONSTRAINT "FK_852430431d24ce04a6ea0b7cc6c"`);
        await queryRunner.query(`ALTER TABLE "eventGamme" DROP CONSTRAINT "FK_8d2d178a225b6d7036b81b9156e"`);
        await queryRunner.query(`ALTER TABLE "game" DROP CONSTRAINT "FK_e158af77fc868da1b37fff0f8f0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e0eb817aeff531dcb389c2097d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_28cab13bcc4cd62b1682d7a765"`);
        await queryRunner.query(`DROP TABLE "user_owned_games_game"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7e7ed62376381416e4cb66e2ec"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_58288de8661c13a28b6ac1f251"`);
        await queryRunner.query(`DROP TABLE "event_gamme_participants_user"`);
        await queryRunner.query(`DROP TABLE "spot"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "eventGamme"`);
        await queryRunner.query(`DROP TABLE "game"`);
        await queryRunner.query(`DROP TABLE "game_genre"`);
        await queryRunner.query(`DROP TYPE "public"."game_genre_name_enum"`);
    }

}
