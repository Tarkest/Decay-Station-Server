import {MigrationInterface, QueryRunner} from "typeorm";

export class Locomotive1591571775584 implements MigrationInterface {
    name = 'Locomotive1591571775584'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `locomotive_update_slot` (`id` int NOT NULL AUTO_INCREMENT, `count` int NOT NULL, `requiredCount` int NOT NULL, `locomotiveId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `locomotive_building` (`id` int NOT NULL AUTO_INCREMENT, `index` int NOT NULL, `locomotiveId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `locomotive` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `level` int NOT NULL, `dataId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `locomotive_building_slot_buffer` ADD `index` int NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `locomotive_building_slot` ADD `index` int NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `locomotive_update_slot` ADD CONSTRAINT `FK_ebfab28781c352b3ca12d983a87` FOREIGN KEY (`locomotiveId`) REFERENCES `locomotive`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `locomotive_building` ADD CONSTRAINT `FK_7cddab1ffa842fc526d4473ff0f` FOREIGN KEY (`locomotiveId`) REFERENCES `locomotive`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `locomotive` ADD CONSTRAINT `FK_04d4144b0840f58b776504ed8dc` FOREIGN KEY (`dataId`) REFERENCES `locomotive_data`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `locomotive` DROP FOREIGN KEY `FK_04d4144b0840f58b776504ed8dc`", undefined);
        await queryRunner.query("ALTER TABLE `locomotive_building` DROP FOREIGN KEY `FK_7cddab1ffa842fc526d4473ff0f`", undefined);
        await queryRunner.query("ALTER TABLE `locomotive_update_slot` DROP FOREIGN KEY `FK_ebfab28781c352b3ca12d983a87`", undefined);
        await queryRunner.query("ALTER TABLE `locomotive_building_slot` DROP COLUMN `index`", undefined);
        await queryRunner.query("ALTER TABLE `locomotive_building_slot_buffer` DROP COLUMN `index`", undefined);
        await queryRunner.query("DROP TABLE `locomotive`", undefined);
        await queryRunner.query("DROP TABLE `locomotive_building`", undefined);
        await queryRunner.query("DROP TABLE `locomotive_update_slot`", undefined);
    }

}
