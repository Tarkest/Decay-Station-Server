import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1556193752874 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "CarriageTypes" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_7aad90d0572bab4a73f735f5ce3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Users" ("id" SERIAL NOT NULL, "nickname" character varying NOT NULL, "googleApiKey" character varying NOT NULL, "accountKey" character varying NOT NULL, "level" character varying NOT NULL, "accountExperience" integer NOT NULL, "isDeleted" boolean NOT NULL, CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Items" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "amount" integer NOT NULL, "cellId" integer NOT NULL, "locomotiveId" integer, "carriageId" integer, "characterId" integer, CONSTRAINT "PK_189aa34dd7379663b1033e37c65" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Locomotives" ("id" SERIAL NOT NULL, "level" integer NOT NULL DEFAULT 1, "typeId" integer NOT NULL, "userId" integer, CONSTRAINT "REL_406d0ac2b2eda37620c5df1bc3" UNIQUE ("typeId"), CONSTRAINT "PK_8284bd9b851a8ac240d870ec250" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "LocomotiveTypes" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_a41f694104599fc1e5379f16829" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "TrainBuildings" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "isOuter" boolean NOT NULL DEFAULT 'false', "typeId" integer, "currentStampId" integer, "locomotiveId" integer, "carriageId" integer, CONSTRAINT "REL_280d4c041c5574020f66529cb4" UNIQUE ("typeId"), CONSTRAINT "REL_dda8f00473fde9a54c73a84b9f" UNIQUE ("currentStampId"), CONSTRAINT "PK_3543654dad23f79c16a4bbb7129" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "TrainBuildingTypes" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_a8c1234d6ab6d2fe90faf6ef3da" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Carriages" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "userId" integer, "typeId" integer NOT NULL, CONSTRAINT "REL_524edd860f03c64e98095fb04c" UNIQUE ("typeId"), CONSTRAINT "PK_8976644812933b44cd4d77e45ed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "TimeStampTypes" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_e25d596dcc51946719bad014b0e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Recipes" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_9d7c2ba1cdf75f24e4976cab724" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "TimeStamps" ("id" SERIAL NOT NULL, "endDate" date NOT NULL, "startDate" date NOT NULL, "counter" integer NOT NULL, "itemsCapacity" integer NOT NULL, "typeId" integer NOT NULL, "itemId" integer NOT NULL, "recipeId" integer NOT NULL, CONSTRAINT "REL_e8082f19d412d962fad7245c14" UNIQUE ("typeId"), CONSTRAINT "REL_f54da4a00b0991150f6b8b7572" UNIQUE ("itemId"), CONSTRAINT "REL_ef7f36323e779903d9310f1436" UNIQUE ("recipeId"), CONSTRAINT "PK_089e268fbc27115937957983bf2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Characters" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "strength" integer NOT NULL, "agility" integer NOT NULL, "intelligence" integer NOT NULL, "userId" integer, "typeId" integer NOT NULL, "specializationId" integer NOT NULL, CONSTRAINT "REL_8b9bb5e9c0e5c4b5b4871efca4" UNIQUE ("typeId"), CONSTRAINT "REL_bcbdf2700ccebcbce492c1ddf2" UNIQUE ("specializationId"), CONSTRAINT "PK_5a64fffdb1089b0893f290e5e2c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "CharacterSpecializations" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_75cd5dc580051c780cee7148457" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "CharacterTypes" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_3683b00508201f0bbc8d6a8613d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Items" ADD CONSTRAINT "FK_6d52485043303ef266120a387bd" FOREIGN KEY ("locomotiveId") REFERENCES "Locomotives"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Items" ADD CONSTRAINT "FK_1656930380f6dbada092a9c0743" FOREIGN KEY ("carriageId") REFERENCES "Carriages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Items" ADD CONSTRAINT "FK_d0a742f327cda1e715d74b9c374" FOREIGN KEY ("characterId") REFERENCES "Characters"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Locomotives" ADD CONSTRAINT "FK_406d0ac2b2eda37620c5df1bc32" FOREIGN KEY ("typeId") REFERENCES "LocomotiveTypes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Locomotives" ADD CONSTRAINT "FK_19db1c0dfffd1db4437ea3c305f" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "TrainBuildings" ADD CONSTRAINT "FK_280d4c041c5574020f66529cb40" FOREIGN KEY ("typeId") REFERENCES "TrainBuildingTypes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "TrainBuildings" ADD CONSTRAINT "FK_dda8f00473fde9a54c73a84b9fa" FOREIGN KEY ("currentStampId") REFERENCES "TimeStamps"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "TrainBuildings" ADD CONSTRAINT "FK_3bb179fbed4a6dd0d1e854f61e1" FOREIGN KEY ("locomotiveId") REFERENCES "Locomotives"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "TrainBuildings" ADD CONSTRAINT "FK_314cbcea02cb83566cd36b12293" FOREIGN KEY ("carriageId") REFERENCES "Carriages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Carriages" ADD CONSTRAINT "FK_f876cfe3606131cd331f744e22d" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Carriages" ADD CONSTRAINT "FK_524edd860f03c64e98095fb04c8" FOREIGN KEY ("typeId") REFERENCES "CarriageTypes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "TimeStamps" ADD CONSTRAINT "FK_e8082f19d412d962fad7245c14c" FOREIGN KEY ("typeId") REFERENCES "TimeStampTypes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "TimeStamps" ADD CONSTRAINT "FK_f54da4a00b0991150f6b8b75722" FOREIGN KEY ("itemId") REFERENCES "Items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "TimeStamps" ADD CONSTRAINT "FK_ef7f36323e779903d9310f14368" FOREIGN KEY ("recipeId") REFERENCES "Recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Characters" ADD CONSTRAINT "FK_e47502a8b0d7dd9a2676f376bf3" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Characters" ADD CONSTRAINT "FK_8b9bb5e9c0e5c4b5b4871efca4d" FOREIGN KEY ("typeId") REFERENCES "CharacterTypes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Characters" ADD CONSTRAINT "FK_bcbdf2700ccebcbce492c1ddf20" FOREIGN KEY ("specializationId") REFERENCES "CharacterSpecializations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "Characters" DROP CONSTRAINT "FK_bcbdf2700ccebcbce492c1ddf20"`);
        await queryRunner.query(`ALTER TABLE "Characters" DROP CONSTRAINT "FK_8b9bb5e9c0e5c4b5b4871efca4d"`);
        await queryRunner.query(`ALTER TABLE "Characters" DROP CONSTRAINT "FK_e47502a8b0d7dd9a2676f376bf3"`);
        await queryRunner.query(`ALTER TABLE "TimeStamps" DROP CONSTRAINT "FK_ef7f36323e779903d9310f14368"`);
        await queryRunner.query(`ALTER TABLE "TimeStamps" DROP CONSTRAINT "FK_f54da4a00b0991150f6b8b75722"`);
        await queryRunner.query(`ALTER TABLE "TimeStamps" DROP CONSTRAINT "FK_e8082f19d412d962fad7245c14c"`);
        await queryRunner.query(`ALTER TABLE "Carriages" DROP CONSTRAINT "FK_524edd860f03c64e98095fb04c8"`);
        await queryRunner.query(`ALTER TABLE "Carriages" DROP CONSTRAINT "FK_f876cfe3606131cd331f744e22d"`);
        await queryRunner.query(`ALTER TABLE "TrainBuildings" DROP CONSTRAINT "FK_314cbcea02cb83566cd36b12293"`);
        await queryRunner.query(`ALTER TABLE "TrainBuildings" DROP CONSTRAINT "FK_3bb179fbed4a6dd0d1e854f61e1"`);
        await queryRunner.query(`ALTER TABLE "TrainBuildings" DROP CONSTRAINT "FK_dda8f00473fde9a54c73a84b9fa"`);
        await queryRunner.query(`ALTER TABLE "TrainBuildings" DROP CONSTRAINT "FK_280d4c041c5574020f66529cb40"`);
        await queryRunner.query(`ALTER TABLE "Locomotives" DROP CONSTRAINT "FK_19db1c0dfffd1db4437ea3c305f"`);
        await queryRunner.query(`ALTER TABLE "Locomotives" DROP CONSTRAINT "FK_406d0ac2b2eda37620c5df1bc32"`);
        await queryRunner.query(`ALTER TABLE "Items" DROP CONSTRAINT "FK_d0a742f327cda1e715d74b9c374"`);
        await queryRunner.query(`ALTER TABLE "Items" DROP CONSTRAINT "FK_1656930380f6dbada092a9c0743"`);
        await queryRunner.query(`ALTER TABLE "Items" DROP CONSTRAINT "FK_6d52485043303ef266120a387bd"`);
        await queryRunner.query(`DROP TABLE "CharacterTypes"`);
        await queryRunner.query(`DROP TABLE "CharacterSpecializations"`);
        await queryRunner.query(`DROP TABLE "Characters"`);
        await queryRunner.query(`DROP TABLE "TimeStamps"`);
        await queryRunner.query(`DROP TABLE "Recipes"`);
        await queryRunner.query(`DROP TABLE "TimeStampTypes"`);
        await queryRunner.query(`DROP TABLE "Carriages"`);
        await queryRunner.query(`DROP TABLE "TrainBuildingTypes"`);
        await queryRunner.query(`DROP TABLE "TrainBuildings"`);
        await queryRunner.query(`DROP TABLE "LocomotiveTypes"`);
        await queryRunner.query(`DROP TABLE "Locomotives"`);
        await queryRunner.query(`DROP TABLE "Items"`);
        await queryRunner.query(`DROP TABLE "Users"`);
        await queryRunner.query(`DROP TABLE "CarriageTypes"`);
    }

}
