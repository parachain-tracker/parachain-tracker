import { MigrationInterface, QueryRunner } from "typeorm"

export class MigrateDatabase1565276427370 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
            `CREATE TABLE "Ticker" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(32) NOT NULL, "project_id" integer NOT NULL, "coords" text NOT NULL, "trends" text NOT NULL)`,
        )
        await queryRunner.query(
            `CREATE TABLE "temporary_Ticker" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(32) NOT NULL, "project_id" integer NOT NULL, "coords" text NOT NULL, "trends" text NOT NULL, CONSTRAINT "FK_4fd1c1032c898decb2de3615344" FOREIGN KEY ("project_id") REFERENCES "Project" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
        )
        await queryRunner.query(
            `INSERT INTO "temporary_Ticker"("id", "name", "project_id", "coords", "trends") SELECT "id", "name", "project_id", "coords", "trends" FROM "Ticker"`,
        )
        await queryRunner.query(`DROP TABLE "Ticker"`)
        await queryRunner.query(`ALTER TABLE "temporary_Ticker" RENAME TO "Ticker"`)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "Ticker" RENAME TO "temporary_Ticker"`)
        await queryRunner.query(
            `CREATE TABLE "Ticker" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(32) NOT NULL, "project_id" integer NOT NULL, "coords" text NOT NULL, "trends" text NOT NULL)`,
        )
        await queryRunner.query(
            `INSERT INTO "Ticker"("id", "name", "project_id", "coords", "trends") SELECT "id", "name", "project_id", "coords", "trends" FROM "temporary_Ticker"`,
        )
        await queryRunner.query(`DROP TABLE "temporary_Ticker"`)
        await queryRunner.query(`DROP TABLE "Ticker"`)
    }
}
