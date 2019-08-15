import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateDatabase1565249767311 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
            `CREATE TABLE "Category" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(32) NOT NULL)`,
        )
        await queryRunner.query(
            `CREATE TABLE "ExternalLink" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(32) NOT NULL, "url" text NOT NULL)`,
        )
        await queryRunner.query(
            `CREATE TABLE "Dapp" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(256) NOT NULL, "developer" varchar(256) NOT NULL, "description" text NOT NULL, "status" integer NOT NULL, "link" text NOT NULL, "stars" integer NOT NULL, "commits" integer NOT NULL, "network" varchar(32) NOT NULL, "categoryId" integer, CONSTRAINT "REL_d80d7d389ff8084d2c761727bc" UNIQUE ("categoryId"))`,
        )
        await queryRunner.query(
            `CREATE TABLE "dapp_external_links__external_link" ("dappId" integer NOT NULL, "externalLinkId" integer NOT NULL, PRIMARY KEY ("dappId", "externalLinkId"))`,
        )
        await queryRunner.query(
            `CREATE INDEX "IDX_a91ea579fe7c7d0c99dee62568" ON "dapp_external_links__external_link" ("dappId") `,
        )
        await queryRunner.query(
            `CREATE INDEX "IDX_ee8b4b4d481e8ae809453bd61b" ON "dapp_external_links__external_link" ("externalLinkId") `,
        )
        await queryRunner.query(
            `CREATE TABLE "temporary_Dapp" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(256) NOT NULL, "developer" varchar(256) NOT NULL, "description" text NOT NULL, "status" integer NOT NULL, "link" text NOT NULL, "stars" integer NOT NULL, "commits" integer NOT NULL, "network" varchar(32) NOT NULL, "categoryId" integer, CONSTRAINT "REL_d80d7d389ff8084d2c761727bc" UNIQUE ("categoryId"), CONSTRAINT "FK_d80d7d389ff8084d2c761727bc9" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
        )
        await queryRunner.query(
            `INSERT INTO "temporary_Dapp"("id", "name", "developer", "description", "status", "link", "stars", "commits", "network", "categoryId") SELECT "id", "name", "developer", "description", "status", "link", "stars", "commits", "network", "categoryId" FROM "Dapp"`,
        )
        await queryRunner.query(`DROP TABLE "Dapp"`)
        await queryRunner.query(`ALTER TABLE "temporary_Dapp" RENAME TO "Dapp"`)
        await queryRunner.query(`DROP INDEX "IDX_a91ea579fe7c7d0c99dee62568"`)
        await queryRunner.query(`DROP INDEX "IDX_ee8b4b4d481e8ae809453bd61b"`)
        await queryRunner.query(
            `CREATE TABLE "temporary_dapp_external_links__external_link" ("dappId" integer NOT NULL, "externalLinkId" integer NOT NULL, CONSTRAINT "FK_a91ea579fe7c7d0c99dee62568d" FOREIGN KEY ("dappId") REFERENCES "Dapp" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_ee8b4b4d481e8ae809453bd61b9" FOREIGN KEY ("externalLinkId") REFERENCES "ExternalLink" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, PRIMARY KEY ("dappId", "externalLinkId"))`,
        )
        await queryRunner.query(
            `INSERT INTO "temporary_dapp_external_links__external_link"("dappId", "externalLinkId") SELECT "dappId", "externalLinkId" FROM "dapp_external_links__external_link"`,
        )
        await queryRunner.query(`DROP TABLE "dapp_external_links__external_link"`)
        await queryRunner.query(
            `ALTER TABLE "temporary_dapp_external_links__external_link" RENAME TO "dapp_external_links__external_link"`,
        )
        await queryRunner.query(
            `CREATE INDEX "IDX_a91ea579fe7c7d0c99dee62568" ON "dapp_external_links__external_link" ("dappId") `,
        )
        await queryRunner.query(
            `CREATE INDEX "IDX_ee8b4b4d481e8ae809453bd61b" ON "dapp_external_links__external_link" ("externalLinkId") `,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "IDX_ee8b4b4d481e8ae809453bd61b"`)
        await queryRunner.query(`DROP INDEX "IDX_a91ea579fe7c7d0c99dee62568"`)
        await queryRunner.query(
            `ALTER TABLE "dapp_external_links__external_link" RENAME TO "temporary_dapp_external_links__external_link"`,
        )
        await queryRunner.query(
            `CREATE TABLE "dapp_external_links__external_link" ("dappId" integer NOT NULL, "externalLinkId" integer NOT NULL, PRIMARY KEY ("dappId", "externalLinkId"))`,
        )
        await queryRunner.query(
            `INSERT INTO "dapp_external_links__external_link"("dappId", "externalLinkId") SELECT "dappId", "externalLinkId" FROM "temporary_dapp_external_links__external_link"`,
        )
        await queryRunner.query(`DROP TABLE "temporary_dapp_external_links__external_link"`)
        await queryRunner.query(
            `CREATE INDEX "IDX_ee8b4b4d481e8ae809453bd61b" ON "dapp_external_links__external_link" ("externalLinkId") `,
        )
        await queryRunner.query(
            `CREATE INDEX "IDX_a91ea579fe7c7d0c99dee62568" ON "dapp_external_links__external_link" ("dappId") `,
        )
        await queryRunner.query(`ALTER TABLE "Dapp" RENAME TO "temporary_Dapp"`)
        await queryRunner.query(
            `CREATE TABLE "Dapp" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(256) NOT NULL, "developer" varchar(256) NOT NULL, "description" text NOT NULL, "status" integer NOT NULL, "link" text NOT NULL, "stars" integer NOT NULL, "commits" integer NOT NULL, "network" varchar(32) NOT NULL, "categoryId" integer, CONSTRAINT "REL_d80d7d389ff8084d2c761727bc" UNIQUE ("categoryId"))`,
        )
        await queryRunner.query(
            `INSERT INTO "Dapp"("id", "name", "developer", "description", "status", "link", "stars", "commits", "network", "categoryId") SELECT "id", "name", "developer", "description", "status", "link", "stars", "commits", "network", "categoryId" FROM "temporary_Dapp"`,
        )
        await queryRunner.query(`DROP TABLE "temporary_Dapp"`)
        await queryRunner.query(`DROP INDEX "IDX_ee8b4b4d481e8ae809453bd61b"`)
        await queryRunner.query(`DROP INDEX "IDX_a91ea579fe7c7d0c99dee62568"`)
        await queryRunner.query(`DROP TABLE "dapp_external_links__external_link"`)
        await queryRunner.query(`DROP TABLE "Dapp"`)
        await queryRunner.query(`DROP TABLE "ExternalLink"`)
        await queryRunner.query(`DROP TABLE "Category"`)
    }
}
