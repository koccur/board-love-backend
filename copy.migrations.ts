// import { MigrationInterface, QueryRunner } from "typeorm";

// export class InitialSchema1740054612614 implements MigrationInterface {
//   name = 'InitialSchema1740054612614'


//   public async up(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.query(`
//             INSERT INTO "user" (username, email, password,"isVerified","raiting")
//             VALUES ('John Doe', 'john@example.com', '$2b$10$hashedpassword123',false,1),
//             ('Jack Connor', 'Connor@example.com', 'Password',false,1);
//           `);
//     await queryRunner.query(`
//             INSERT INTO "game_genre" ("name") VALUES ('STRATEGY'), ('PARTY'),('COOPERATIVE'), ('FAMILY'), ('DECK_BUILDING'),('ROLE_PLAYING'),('WAR'),('ABSTRACT'),('THEMATIC'),('EUROGAME'),('DEDUCTION'),('WORD');             
//         `);

//         await queryRunner.query(`
//                       INSERT INTO "spot" (name, description, location,"openDays","openHour","closeHour")
//             VALUES ('Farma Konstantego', 'Super miejsce', 'Farma 123',NULL,8,20),
//             ('Szara 39', 'Gdansk rulez', 'Szara 39',NULL,12,24);
//       `);    
//     await queryRunner.query(`
//           INSERT INTO "game" (title, description,"releaseDate", "numberOfPlayers", time, "ageRestriction","game_genre") 
// VALUES 
// ('Catan', 'A strategy board game','1995-01-01', 4, 90, 10,1),
// ('Risk', 'A strategic war game', '1957-01-01', 6, 180, 10, 5),
// ('Dungeons & Dragons', 'A classic role-playing game', '1974-01-01', 5, NULL, 12, 6),
// ('Monopoly', 'A classic family game', '1935-01-01', 6, 120, 8, 2),
// ('Pandemic', 'A cooperative game about saving the world', '2008-01-01', 4, 60, 13, 4);
// `)
//   }

//   public async down(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.query(`
//             DELETE FROM "user" WHERE email = 'john@example.com';
//           `);
//     await queryRunner.query(`
//             DELETE FROM "user" WHERE email = 'Connor@example.com';
//           `);
//     await queryRunner.query(`DROP TABLE "game_genre";`);
//     await queryRunner.query(`DROP TABLE "game";`);
//     await queryRunner.query(`DROP TYPE "game_genre_enum";`);
//   }

// }
