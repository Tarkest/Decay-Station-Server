import {MigrationInterface, QueryRunner} from "typeorm";

export class LocomotiveData1591458223556 implements MigrationInterface {
    name = 'LocomotiveData1591458223556'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `locomotive_data_upgrade` (`id` int NOT NULL AUTO_INCREMENT, `count` int NOT NULL, `level` int NOT NULL, `itemId` int NULL, `locomotiveDataId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `locomotive_data_upgrade_buffer` (`id` int NOT NULL AUTO_INCREMENT, `count` int NOT NULL, `level` int NOT NULL, `itemId` int NULL, `locomotiveDataId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `locomotive_building_slot_buffer` (`id` int NOT NULL AUTO_INCREMENT, `level` int NOT NULL, `buildingTypeId` int NULL, `locomotiveDataId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `locomotive_data_buffer` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `maxLevel` int NOT NULL, `currentVersionId` int NULL, UNIQUE INDEX `REL_8a9f9b81f698167b1e6b32b188` (`currentVersionId`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `locomotive_data` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `maxLevel` int NOT NULL, `inRotation` tinyint NOT NULL, `updateBufferId` int NULL, UNIQUE INDEX `REL_734a8c67f0083c8b37c8f1863c` (`updateBufferId`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `locomotive_building_slot` (`id` int NOT NULL AUTO_INCREMENT, `level` int NOT NULL, `buildingTypeId` int NULL, `locomotiveDataId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `locomotive_data_upgrade` ADD CONSTRAINT `FK_705dd09dacc41aed749024b975c` FOREIGN KEY (`itemId`) REFERENCES `item_data`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `locomotive_data_upgrade` ADD CONSTRAINT `FK_20e818a5d350c0e1a34cdf89bb9` FOREIGN KEY (`locomotiveDataId`) REFERENCES `locomotive_data`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `locomotive_data_upgrade_buffer` ADD CONSTRAINT `FK_78f2140412203e73ec2680890d5` FOREIGN KEY (`itemId`) REFERENCES `item_data`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `locomotive_data_upgrade_buffer` ADD CONSTRAINT `FK_bf5ccb0542b7a369349ca285780` FOREIGN KEY (`locomotiveDataId`) REFERENCES `locomotive_data_buffer`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `locomotive_building_slot_buffer` ADD CONSTRAINT `FK_581336be229ab563d791c3812a7` FOREIGN KEY (`buildingTypeId`) REFERENCES `building_type`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `locomotive_building_slot_buffer` ADD CONSTRAINT `FK_ee520efbf84e8f3dfa2bd9d71e7` FOREIGN KEY (`locomotiveDataId`) REFERENCES `locomotive_data_buffer`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `locomotive_data_buffer` ADD CONSTRAINT `FK_8a9f9b81f698167b1e6b32b1888` FOREIGN KEY (`currentVersionId`) REFERENCES `locomotive_data`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `locomotive_data` ADD CONSTRAINT `FK_734a8c67f0083c8b37c8f1863cb` FOREIGN KEY (`updateBufferId`) REFERENCES `locomotive_data_buffer`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `locomotive_building_slot` ADD CONSTRAINT `FK_d884b88a8239fb2d7c6127ab968` FOREIGN KEY (`buildingTypeId`) REFERENCES `building_type`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `locomotive_building_slot` ADD CONSTRAINT `FK_1c7d66c585a8886bc19cacbcc4b` FOREIGN KEY (`locomotiveDataId`) REFERENCES `locomotive_data`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `locomotive_building_slot` DROP FOREIGN KEY `FK_1c7d66c585a8886bc19cacbcc4b`", undefined);
        await queryRunner.query("ALTER TABLE `locomotive_building_slot` DROP FOREIGN KEY `FK_d884b88a8239fb2d7c6127ab968`", undefined);
        await queryRunner.query("ALTER TABLE `locomotive_data` DROP FOREIGN KEY `FK_734a8c67f0083c8b37c8f1863cb`", undefined);
        await queryRunner.query("ALTER TABLE `locomotive_data_buffer` DROP FOREIGN KEY `FK_8a9f9b81f698167b1e6b32b1888`", undefined);
        await queryRunner.query("ALTER TABLE `locomotive_building_slot_buffer` DROP FOREIGN KEY `FK_ee520efbf84e8f3dfa2bd9d71e7`", undefined);
        await queryRunner.query("ALTER TABLE `locomotive_building_slot_buffer` DROP FOREIGN KEY `FK_581336be229ab563d791c3812a7`", undefined);
        await queryRunner.query("ALTER TABLE `locomotive_data_upgrade_buffer` DROP FOREIGN KEY `FK_bf5ccb0542b7a369349ca285780`", undefined);
        await queryRunner.query("ALTER TABLE `locomotive_data_upgrade_buffer` DROP FOREIGN KEY `FK_78f2140412203e73ec2680890d5`", undefined);
        await queryRunner.query("ALTER TABLE `locomotive_data_upgrade` DROP FOREIGN KEY `FK_20e818a5d350c0e1a34cdf89bb9`", undefined);
        await queryRunner.query("ALTER TABLE `locomotive_data_upgrade` DROP FOREIGN KEY `FK_705dd09dacc41aed749024b975c`", undefined);
        await queryRunner.query("DROP TABLE `locomotive_building_slot`", undefined);
        await queryRunner.query("DROP INDEX `REL_734a8c67f0083c8b37c8f1863c` ON `locomotive_data`", undefined);
        await queryRunner.query("DROP TABLE `locomotive_data`", undefined);
        await queryRunner.query("DROP INDEX `REL_8a9f9b81f698167b1e6b32b188` ON `locomotive_data_buffer`", undefined);
        await queryRunner.query("DROP TABLE `locomotive_data_buffer`", undefined);
        await queryRunner.query("DROP TABLE `locomotive_building_slot_buffer`", undefined);
        await queryRunner.query("DROP TABLE `locomotive_data_upgrade_buffer`", undefined);
        await queryRunner.query("DROP TABLE `locomotive_data_upgrade`", undefined);
    }

}
