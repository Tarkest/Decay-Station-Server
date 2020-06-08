import {MigrationInterface, QueryRunner} from "typeorm";

export class CarriageData1591458458856 implements MigrationInterface {
    name = 'CarriageData1591458458856'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `carriage_building_slot` (`id` int NOT NULL AUTO_INCREMENT, `buildingSize` int NOT NULL, `buildingTypeId` int NULL, `carriageDataId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `carriage_assembly_item_buffer` (`id` int NOT NULL AUTO_INCREMENT, `count` int NOT NULL, `itemId` int NULL, `carriageDataId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `carriage_building_slot_buffer` (`id` int NOT NULL AUTO_INCREMENT, `buildingSize` int NOT NULL, `buildingTypeId` int NULL, `carriageDataId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `carriage_data_buffer` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `storageCapacity` int NOT NULL, `crewCapacity` int NOT NULL, `currentVersionId` int NULL, UNIQUE INDEX `REL_68a14e8a0d5a47f3430c95a467` (`currentVersionId`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `carriage_data` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `inRotation` tinyint NOT NULL, `storageCapacity` int NOT NULL, `crewCapacity` int NOT NULL, `updateBufferId` int NULL, UNIQUE INDEX `REL_7a5dffd1fb6c8f53ef855194ee` (`updateBufferId`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `carriage_assembly_item` (`id` int NOT NULL AUTO_INCREMENT, `count` int NOT NULL, `itemId` int NULL, `carriageDataId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `carriage_building_slot` ADD CONSTRAINT `FK_9cf23d48591869eb1df459d3af4` FOREIGN KEY (`buildingTypeId`) REFERENCES `building_type`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `carriage_building_slot` ADD CONSTRAINT `FK_4e0f7134df9787329f2d9c84586` FOREIGN KEY (`carriageDataId`) REFERENCES `carriage_data`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `carriage_assembly_item_buffer` ADD CONSTRAINT `FK_8ec496828b9a6c752edf70c9239` FOREIGN KEY (`itemId`) REFERENCES `item_data`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `carriage_assembly_item_buffer` ADD CONSTRAINT `FK_c0232a767ffc0b92b86d97017b1` FOREIGN KEY (`carriageDataId`) REFERENCES `carriage_data_buffer`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `carriage_building_slot_buffer` ADD CONSTRAINT `FK_48d37134393acd55d04629849c8` FOREIGN KEY (`buildingTypeId`) REFERENCES `building_type`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `carriage_building_slot_buffer` ADD CONSTRAINT `FK_81278a0a5dbd720018d84ad1a45` FOREIGN KEY (`carriageDataId`) REFERENCES `carriage_data_buffer`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `carriage_data_buffer` ADD CONSTRAINT `FK_68a14e8a0d5a47f3430c95a4677` FOREIGN KEY (`currentVersionId`) REFERENCES `carriage_data`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `carriage_data` ADD CONSTRAINT `FK_7a5dffd1fb6c8f53ef855194eee` FOREIGN KEY (`updateBufferId`) REFERENCES `carriage_data_buffer`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `carriage_assembly_item` ADD CONSTRAINT `FK_26a0dfc440e99efcdadab437c34` FOREIGN KEY (`itemId`) REFERENCES `item_data`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `carriage_assembly_item` ADD CONSTRAINT `FK_df7679ddc73c33bd7cf768e7be9` FOREIGN KEY (`carriageDataId`) REFERENCES `carriage_data`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `carriage_assembly_item` DROP FOREIGN KEY `FK_df7679ddc73c33bd7cf768e7be9`", undefined);
        await queryRunner.query("ALTER TABLE `carriage_assembly_item` DROP FOREIGN KEY `FK_26a0dfc440e99efcdadab437c34`", undefined);
        await queryRunner.query("ALTER TABLE `carriage_data` DROP FOREIGN KEY `FK_7a5dffd1fb6c8f53ef855194eee`", undefined);
        await queryRunner.query("ALTER TABLE `carriage_data_buffer` DROP FOREIGN KEY `FK_68a14e8a0d5a47f3430c95a4677`", undefined);
        await queryRunner.query("ALTER TABLE `carriage_building_slot_buffer` DROP FOREIGN KEY `FK_81278a0a5dbd720018d84ad1a45`", undefined);
        await queryRunner.query("ALTER TABLE `carriage_building_slot_buffer` DROP FOREIGN KEY `FK_48d37134393acd55d04629849c8`", undefined);
        await queryRunner.query("ALTER TABLE `carriage_assembly_item_buffer` DROP FOREIGN KEY `FK_c0232a767ffc0b92b86d97017b1`", undefined);
        await queryRunner.query("ALTER TABLE `carriage_assembly_item_buffer` DROP FOREIGN KEY `FK_8ec496828b9a6c752edf70c9239`", undefined);
        await queryRunner.query("ALTER TABLE `carriage_building_slot` DROP FOREIGN KEY `FK_4e0f7134df9787329f2d9c84586`", undefined);
        await queryRunner.query("ALTER TABLE `carriage_building_slot` DROP FOREIGN KEY `FK_9cf23d48591869eb1df459d3af4`", undefined);
        await queryRunner.query("DROP TABLE `carriage_assembly_item`", undefined);
        await queryRunner.query("DROP INDEX `REL_7a5dffd1fb6c8f53ef855194ee` ON `carriage_data`", undefined);
        await queryRunner.query("DROP TABLE `carriage_data`", undefined);
        await queryRunner.query("DROP INDEX `REL_68a14e8a0d5a47f3430c95a467` ON `carriage_data_buffer`", undefined);
        await queryRunner.query("DROP TABLE `carriage_data_buffer`", undefined);
        await queryRunner.query("DROP TABLE `carriage_building_slot_buffer`", undefined);
        await queryRunner.query("DROP TABLE `carriage_assembly_item_buffer`", undefined);
        await queryRunner.query("DROP TABLE `carriage_building_slot`", undefined);
    }

}
