import {MigrationInterface, QueryRunner} from "typeorm";

export class LocomotiveUpgradeSlot1591650655275 implements MigrationInterface {
    name = 'LocomotiveUpgradeSlot1591650655275'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `locomotive_update_slot` ADD `itemId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `locomotive_update_slot` ADD CONSTRAINT `FK_79d0ac2ffde51e53e9b213a060c` FOREIGN KEY (`itemId`) REFERENCES `item_data`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `locomotive_update_slot` DROP FOREIGN KEY `FK_79d0ac2ffde51e53e9b213a060c`", undefined);
        await queryRunner.query("ALTER TABLE `locomotive_update_slot` DROP COLUMN `itemId`", undefined);
    }

}
