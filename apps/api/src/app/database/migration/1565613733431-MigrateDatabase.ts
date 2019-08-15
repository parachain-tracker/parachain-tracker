import { MigrationInterface, QueryRunner } from "typeorm"

export class MigrateDatabase1565613733431 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
            `CREATE TABLE "temporary_Project" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(256) NOT NULL, "developer" varchar(256) NOT NULL, "description" text NOT NULL, "status" integer NOT NULL, "link" text NOT NULL, "stars" integer NOT NULL, "commits" integer NOT NULL, "network" varchar(32) NOT NULL, "categoryId" integer, "tagline" text NOT NULL DEFAULT (''), CONSTRAINT "UQ_af6d1f6d7ab25b4fa6a1a68447c" UNIQUE ("categoryId"), CONSTRAINT "FK_af6d1f6d7ab25b4fa6a1a68447c" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
        )
        await queryRunner.query(
            `INSERT INTO "temporary_Project"("id", "name", "developer", "description", "status", "link", "stars", "commits", "network", "categoryId") SELECT "id", "name", "developer", "description", "status", "link", "stars", "commits", "network", "categoryId" FROM "Project"`,
        )
        await queryRunner.query(`DROP TABLE "Project"`)
        await queryRunner.query(`ALTER TABLE "temporary_Project" RENAME TO "Project"`)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "Project" RENAME TO "temporary_Project"`)
        await queryRunner.query(
            `CREATE TABLE "Project" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(256) NOT NULL, "developer" varchar(256) NOT NULL, "description" text NOT NULL, "status" integer NOT NULL, "link" text NOT NULL, "stars" integer NOT NULL, "commits" integer NOT NULL, "network" varchar(32) NOT NULL, "categoryId" integer, CONSTRAINT "UQ_af6d1f6d7ab25b4fa6a1a68447c" UNIQUE ("categoryId"), CONSTRAINT "FK_af6d1f6d7ab25b4fa6a1a68447c" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
        )
        await queryRunner.query(
            `INSERT INTO "Project"("id", "name", "developer", "description", "status", "link", "stars", "commits", "network", "categoryId") SELECT "id", "name", "developer", "description", "status", "link", "stars", "commits", "network", "categoryId" FROM "temporary_Project"`,
        )
        await queryRunner.query(`DROP TABLE "temporary_Project"`)
    }
}
