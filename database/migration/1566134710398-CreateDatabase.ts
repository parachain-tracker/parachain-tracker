import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateDatabase1566134710398 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
            `CREATE TABLE "Category" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(32) NOT NULL)`,
        )
        await queryRunner.query(
            `CREATE TABLE "ExternalLink" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(32) NOT NULL, "url" text NOT NULL)`,
        )
        await queryRunner.query(
            `CREATE TABLE "Project" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "type" integer NOT NULL DEFAULT (0), "featured" tinyint NOT NULL DEFAULT (0), "name" varchar(256) NOT NULL, "developer" varchar(256) NOT NULL, "description" text NOT NULL, "status" integer NOT NULL, "link" text NOT NULL, "stars" integer NOT NULL DEFAULT (0), "commits" integer NOT NULL DEFAULT (0), "network" varchar(32) NOT NULL, "tagline" text NOT NULL DEFAULT (''), "githubRepo" text NOT NULL, "categoryId" integer)`,
        )
        await queryRunner.query(
            `CREATE TABLE "Ticker" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(32) NOT NULL, "project_id" integer NOT NULL, "coords" text NOT NULL, "trends" text NOT NULL)`,
        )
        await queryRunner.query(
            `CREATE TABLE "project_external_links__external_link" ("projectId" integer NOT NULL, "externalLinkId" integer NOT NULL, PRIMARY KEY ("projectId", "externalLinkId"))`,
        )
        await queryRunner.query(
            `CREATE INDEX "IDX_2f390e4825ed969d133684f1a0" ON "project_external_links__external_link" ("projectId") `,
        )
        await queryRunner.query(
            `CREATE INDEX "IDX_0353ceafa0ddbe7468282be58d" ON "project_external_links__external_link" ("externalLinkId") `,
        )
        await queryRunner.query(
            `CREATE TABLE "temporary_Project" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "type" integer NOT NULL DEFAULT (0), "featured" tinyint NOT NULL DEFAULT (0), "name" varchar(256) NOT NULL, "developer" varchar(256) NOT NULL, "description" text NOT NULL, "status" integer NOT NULL, "link" text NOT NULL, "stars" integer NOT NULL DEFAULT (0), "commits" integer NOT NULL DEFAULT (0), "network" varchar(32) NOT NULL, "tagline" text NOT NULL DEFAULT (''), "githubRepo" text NOT NULL, "categoryId" integer, CONSTRAINT "FK_af6d1f6d7ab25b4fa6a1a68447c" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
        )
        await queryRunner.query(
            `INSERT INTO "temporary_Project"("id", "type", "featured", "name", "developer", "description", "status", "link", "stars", "commits", "network", "tagline", "githubRepo", "categoryId") SELECT "id", "type", "featured", "name", "developer", "description", "status", "link", "stars", "commits", "network", "tagline", "githubRepo", "categoryId" FROM "Project"`,
        )
        await queryRunner.query(`DROP TABLE "Project"`)
        await queryRunner.query(`ALTER TABLE "temporary_Project" RENAME TO "Project"`)
        await queryRunner.query(
            `CREATE TABLE "temporary_Ticker" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(32) NOT NULL, "project_id" integer NOT NULL, "coords" text NOT NULL, "trends" text NOT NULL, CONSTRAINT "FK_4fd1c1032c898decb2de3615344" FOREIGN KEY ("project_id") REFERENCES "Project" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
        )
        await queryRunner.query(
            `INSERT INTO "temporary_Ticker"("id", "name", "project_id", "coords", "trends") SELECT "id", "name", "project_id", "coords", "trends" FROM "Ticker"`,
        )
        await queryRunner.query(`DROP TABLE "Ticker"`)
        await queryRunner.query(`ALTER TABLE "temporary_Ticker" RENAME TO "Ticker"`)
        await queryRunner.query(`DROP INDEX "IDX_2f390e4825ed969d133684f1a0"`)
        await queryRunner.query(`DROP INDEX "IDX_0353ceafa0ddbe7468282be58d"`)
        await queryRunner.query(
            `CREATE TABLE "temporary_project_external_links__external_link" ("projectId" integer NOT NULL, "externalLinkId" integer NOT NULL, CONSTRAINT "FK_2f390e4825ed969d133684f1a03" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_0353ceafa0ddbe7468282be58dd" FOREIGN KEY ("externalLinkId") REFERENCES "ExternalLink" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, PRIMARY KEY ("projectId", "externalLinkId"))`,
        )
        await queryRunner.query(
            `INSERT INTO "temporary_project_external_links__external_link"("projectId", "externalLinkId") SELECT "projectId", "externalLinkId" FROM "project_external_links__external_link"`,
        )
        await queryRunner.query(`DROP TABLE "project_external_links__external_link"`)
        await queryRunner.query(
            `ALTER TABLE "temporary_project_external_links__external_link" RENAME TO "project_external_links__external_link"`,
        )
        await queryRunner.query(
            `CREATE INDEX "IDX_2f390e4825ed969d133684f1a0" ON "project_external_links__external_link" ("projectId") `,
        )
        await queryRunner.query(
            `CREATE INDEX "IDX_0353ceafa0ddbe7468282be58d" ON "project_external_links__external_link" ("externalLinkId") `,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "IDX_0353ceafa0ddbe7468282be58d"`)
        await queryRunner.query(`DROP INDEX "IDX_2f390e4825ed969d133684f1a0"`)
        await queryRunner.query(
            `ALTER TABLE "project_external_links__external_link" RENAME TO "temporary_project_external_links__external_link"`,
        )
        await queryRunner.query(
            `CREATE TABLE "project_external_links__external_link" ("projectId" integer NOT NULL, "externalLinkId" integer NOT NULL, PRIMARY KEY ("projectId", "externalLinkId"))`,
        )
        await queryRunner.query(
            `INSERT INTO "project_external_links__external_link"("projectId", "externalLinkId") SELECT "projectId", "externalLinkId" FROM "temporary_project_external_links__external_link"`,
        )
        await queryRunner.query(`DROP TABLE "temporary_project_external_links__external_link"`)
        await queryRunner.query(
            `CREATE INDEX "IDX_0353ceafa0ddbe7468282be58d" ON "project_external_links__external_link" ("externalLinkId") `,
        )
        await queryRunner.query(
            `CREATE INDEX "IDX_2f390e4825ed969d133684f1a0" ON "project_external_links__external_link" ("projectId") `,
        )
        await queryRunner.query(`ALTER TABLE "Ticker" RENAME TO "temporary_Ticker"`)
        await queryRunner.query(
            `CREATE TABLE "Ticker" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(32) NOT NULL, "project_id" integer NOT NULL, "coords" text NOT NULL, "trends" text NOT NULL)`,
        )
        await queryRunner.query(
            `INSERT INTO "Ticker"("id", "name", "project_id", "coords", "trends") SELECT "id", "name", "project_id", "coords", "trends" FROM "temporary_Ticker"`,
        )
        await queryRunner.query(`DROP TABLE "temporary_Ticker"`)
        await queryRunner.query(`ALTER TABLE "Project" RENAME TO "temporary_Project"`)
        await queryRunner.query(
            `CREATE TABLE "Project" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "type" integer NOT NULL DEFAULT (0), "featured" tinyint NOT NULL DEFAULT (0), "name" varchar(256) NOT NULL, "developer" varchar(256) NOT NULL, "description" text NOT NULL, "status" integer NOT NULL, "link" text NOT NULL, "stars" integer NOT NULL DEFAULT (0), "commits" integer NOT NULL DEFAULT (0), "network" varchar(32) NOT NULL, "tagline" text NOT NULL DEFAULT (''), "githubRepo" text NOT NULL, "categoryId" integer)`,
        )
        await queryRunner.query(
            `INSERT INTO "Project"("id", "type", "featured", "name", "developer", "description", "status", "link", "stars", "commits", "network", "tagline", "githubRepo", "categoryId") SELECT "id", "type", "featured", "name", "developer", "description", "status", "link", "stars", "commits", "network", "tagline", "githubRepo", "categoryId" FROM "temporary_Project"`,
        )
        await queryRunner.query(`DROP TABLE "temporary_Project"`)
        await queryRunner.query(`DROP INDEX "IDX_0353ceafa0ddbe7468282be58d"`)
        await queryRunner.query(`DROP INDEX "IDX_2f390e4825ed969d133684f1a0"`)
        await queryRunner.query(`DROP TABLE "project_external_links__external_link"`)
        await queryRunner.query(`DROP TABLE "Ticker"`)
        await queryRunner.query(`DROP TABLE "Project"`)
        await queryRunner.query(`DROP TABLE "ExternalLink"`)
        await queryRunner.query(`DROP TABLE "Category"`)
    }
}
