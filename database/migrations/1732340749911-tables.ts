import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1732340749911 implements MigrationInterface {
    name = 'Tables1732340749911'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(20) NOT NULL, "description" character varying NOT NULL, "status" character varying(8) NOT NULL DEFAULT 'ACTIVE', "createdate" TIMESTAMP NOT NULL DEFAULT now(), "updateddate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_details" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "lastname" character varying, "phone" character varying, "avatar" character varying, "createdate" TIMESTAMP NOT NULL DEFAULT now(), "updateddate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fb08394d3f499b9e441cab9ca51" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "wallet" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "address" character varying NOT NULL, "prvate_key" character varying NOT NULL, "password" text NOT NULL, CONSTRAINT "UQ_1dcc9f5fd49e3dc52c6d2393c53" UNIQUE ("address"), CONSTRAINT "UQ_a163071a294203968a99deb759b" UNIQUE ("prvate_key"), CONSTRAINT "PK_bec464dd8d54c39c54fd32e2334" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_1dcc9f5fd49e3dc52c6d2393c5" ON "wallet" ("address") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_a163071a294203968a99deb759" ON "wallet" ("prvate_key") `);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "email" character varying NOT NULL, "password" text NOT NULL, "status" character varying(13) NOT NULL DEFAULT 'ACTIVE', "datail_id" uuid, "wallet_id" uuid, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "REL_e9a87388523f59c099c5085b8f" UNIQUE ("datail_id"), CONSTRAINT "REL_67abb81dc33e75d1743323fd5d" UNIQUE ("wallet_id"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_fe0bb3f6520ee0469504521e71" ON "users" ("username") `);
        await queryRunner.query(`CREATE TABLE "user_roles" ("usersId" uuid NOT NULL, "roleId" uuid NOT NULL, CONSTRAINT "PK_c06df5b3bf69aff63bc90b65a3d" PRIMARY KEY ("usersId", "roleId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_99b019339f52c63ae615358738" ON "user_roles" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_86033897c009fcca8b6505d6be" ON "user_roles" ("roleId") `);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_e9a87388523f59c099c5085b8fb" FOREIGN KEY ("datail_id") REFERENCES "user_details"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_67abb81dc33e75d1743323fd5db" FOREIGN KEY ("wallet_id") REFERENCES "wallet"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_99b019339f52c63ae6153587380" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_86033897c009fcca8b6505d6be2" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_86033897c009fcca8b6505d6be2"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_99b019339f52c63ae6153587380"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_67abb81dc33e75d1743323fd5db"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_e9a87388523f59c099c5085b8fb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_86033897c009fcca8b6505d6be"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_99b019339f52c63ae615358738"`);
        await queryRunner.query(`DROP TABLE "user_roles"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fe0bb3f6520ee0469504521e71"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a163071a294203968a99deb759"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1dcc9f5fd49e3dc52c6d2393c5"`);
        await queryRunner.query(`DROP TABLE "wallet"`);
        await queryRunner.query(`DROP TABLE "user_details"`);
        await queryRunner.query(`DROP TABLE "role"`);
    }

}
