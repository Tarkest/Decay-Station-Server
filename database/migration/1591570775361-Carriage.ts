import {MigrationInterface, QueryRunner} from "typeorm";

export class Carriage1591570775361 implements MigrationInterface {
    name = 'Carriage1591570775361'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `carriage_assemble_slot` (`id` int NOT NULL AUTO_INCREMENT, `count` int NOT NULL, `requiredCount` int NOT NULL, `carriageId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `carriage_building` (`id` int NOT NULL AUTO_INCREMENT, `index` int NOT NULL, `currentBuildingId` int NULL, `carriageId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `carriage` (`id` int NOT NULL AUTO_INCREMENT, `dataId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `carriage_building_slot` ADD `index` int NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `carriage_building_slot_buffer` ADD `index` int NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `inventory_slot` ADD `carrigeId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `carriage_assemble_slot` ADD CONSTRAINT `FK_8d329625846405ea4cea21eb352` FOREIGN KEY (`carriageId`) REFERENCES `carriage`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `carriage_building` ADD CONSTRAINT `FK_330dd7867e17785caa37d1f65f9` FOREIGN KEY (`currentBuildingId`) REFERENCES `building_data`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `carriage_building` ADD CONSTRAINT `FK_a1fea76e0f89e0dd33b331edd0b` FOREIGN KEY (`carriageId`) REFERENCES `carriage`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `carriage` ADD CONSTRAINT `FK_18eafbb253c261d94dc3d744f59` FOREIGN KEY (`dataId`) REFERENCES `carriage_data`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `inventory_slot` ADD CONSTRAINT `FK_e9580147e324692d66a7c976e50` FOREIGN KEY (`carrigeId`) REFERENCES `carriage`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `inventory_slot` DROP FOREIGN KEY `FK_e9580147e324692d66a7c976e50`", undefined);
        await queryRunner.query("ALTER TABLE `carriage` DROP FOREIGN KEY `FK_18eafbb253c261d94dc3d744f59`", undefined);
        await queryRunner.query("ALTER TABLE `carriage_building` DROP FOREIGN KEY `FK_a1fea76e0f89e0dd33b331edd0b`", undefined);
        await queryRunner.query("ALTER TABLE `carriage_building` DROP FOREIGN KEY `FK_330dd7867e17785caa37d1f65f9`", undefined);
        await queryRunner.query("ALTER TABLE `carriage_assemble_slot` DROP FOREIGN KEY `FK_8d329625846405ea4cea21eb352`", undefined);
        await queryRunner.query("ALTER TABLE `inventory_slot` DROP COLUMN `carrigeId`", undefined);
        await queryRunner.query("ALTER TABLE `carriage_building_slot_buffer` DROP COLUMN `index`", undefined);
        await queryRunner.query("ALTER TABLE `carriage_building_slot` DROP COLUMN `index`", undefined);
        await queryRunner.query("DROP TABLE `carriage`", undefined);
        await queryRunner.query("DROP TABLE `carriage_building`", undefined);
        await queryRunner.query("DROP TABLE `carriage_assemble_slot`", undefined);
    }

}
