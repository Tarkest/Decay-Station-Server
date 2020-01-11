import {MigrationInterface, QueryRunner} from "typeorm";

export class Types1578610918463 implements MigrationInterface {
    name = 'Types1578610918463'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `BuildingType` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `BuildingPosition` (`id` int NOT NULL AUTO_INCREMENT, `buildingSize` int NOT NULL, `carriageTypeId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `CarriageTypes` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `storageCapacity` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `ItemsType` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `ItemsRarity` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `ItemTypeBuffer` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `maxCount` int NOT NULL, `typeId` int NULL, `rarityId` int NULL, `currentVersionId` int NULL, UNIQUE INDEX `REL_2802c4f959e4a849cbd33f504b` (`currentVersionId`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `ItemType` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `inRotation` tinyint NOT NULL, `maxCount` int NOT NULL, `typeId` int NULL, `rarityId` int NULL, `updateBufferId` int NULL, UNIQUE INDEX `REL_3843943da1fcce996f93f5ee12` (`updateBufferId`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `CarriagesUpgrades` (`id` int NOT NULL AUTO_INCREMENT, `count` int NOT NULL, `itemId` int NULL, `carriageTypeId` int NULL, UNIQUE INDEX `REL_703e3ea79519cf77557beeaae1` (`itemId`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `LocomotivesUpgrades` (`id` int NOT NULL AUTO_INCREMENT, `count` int NOT NULL, `level` int NOT NULL, `itemId` int NULL, `locomotiveTypeId` int NULL, UNIQUE INDEX `REL_d4813fcb0178d7a72fd6941495` (`itemId`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `LocomotiveTypeUpgradeBuffer` (`id` int NOT NULL AUTO_INCREMENT, `count` int NOT NULL, `level` int NOT NULL, `itemId` int NULL, `locomotiveTypeId` int NULL, UNIQUE INDEX `REL_c343138e54d5b24dff964d96bd` (`itemId`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `LocomotiveTypeBuffer` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `LocomotiveTypes` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `inRotation` tinyint NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `administator` (`id` int NOT NULL AUTO_INCREMENT, `login` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `building_position_buildings_types__building_type` (`buildingPositionId` int NOT NULL, `buildingTypeId` int NOT NULL, INDEX `IDX_14d71138956c1a2da63839c08e` (`buildingPositionId`), INDEX `IDX_e96fc126a89634f35a72137340` (`buildingTypeId`), PRIMARY KEY (`buildingPositionId`, `buildingTypeId`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `BuildingPosition` ADD CONSTRAINT `FK_09c207597ab9785cb728232632d` FOREIGN KEY (`carriageTypeId`) REFERENCES `CarriageTypes`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `ItemTypeBuffer` ADD CONSTRAINT `FK_445be8860b376e144084abc789d` FOREIGN KEY (`typeId`) REFERENCES `ItemsType`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `ItemTypeBuffer` ADD CONSTRAINT `FK_9b5a359ca7cf647cbdb12481408` FOREIGN KEY (`rarityId`) REFERENCES `ItemsRarity`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `ItemTypeBuffer` ADD CONSTRAINT `FK_2802c4f959e4a849cbd33f504b7` FOREIGN KEY (`currentVersionId`) REFERENCES `ItemType`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `ItemType` ADD CONSTRAINT `FK_8022f534012e72f2f4f86181aa4` FOREIGN KEY (`typeId`) REFERENCES `ItemsType`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `ItemType` ADD CONSTRAINT `FK_5fc1920c43a3ab81a2c3cc81f02` FOREIGN KEY (`rarityId`) REFERENCES `ItemsRarity`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `ItemType` ADD CONSTRAINT `FK_3843943da1fcce996f93f5ee12e` FOREIGN KEY (`updateBufferId`) REFERENCES `ItemTypeBuffer`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `CarriagesUpgrades` ADD CONSTRAINT `FK_703e3ea79519cf77557beeaae14` FOREIGN KEY (`itemId`) REFERENCES `ItemType`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `CarriagesUpgrades` ADD CONSTRAINT `FK_1f3b2ac4698bbb93a127f33a2fd` FOREIGN KEY (`carriageTypeId`) REFERENCES `CarriageTypes`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `LocomotivesUpgrades` ADD CONSTRAINT `FK_d4813fcb0178d7a72fd69414957` FOREIGN KEY (`itemId`) REFERENCES `ItemType`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `LocomotivesUpgrades` ADD CONSTRAINT `FK_b9f7b0bcabe8c3ba5174ba8d3f8` FOREIGN KEY (`locomotiveTypeId`) REFERENCES `LocomotiveTypes`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `LocomotiveTypeUpgradeBuffer` ADD CONSTRAINT `FK_c343138e54d5b24dff964d96bdb` FOREIGN KEY (`itemId`) REFERENCES `ItemType`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `LocomotiveTypeUpgradeBuffer` ADD CONSTRAINT `FK_43dc1bdffe417ed83981a3487e2` FOREIGN KEY (`locomotiveTypeId`) REFERENCES `LocomotiveTypeBuffer`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `building_position_buildings_types__building_type` ADD CONSTRAINT `FK_14d71138956c1a2da63839c08ea` FOREIGN KEY (`buildingPositionId`) REFERENCES `BuildingPosition`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `building_position_buildings_types__building_type` ADD CONSTRAINT `FK_e96fc126a89634f35a721373403` FOREIGN KEY (`buildingTypeId`) REFERENCES `BuildingType`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `building_position_buildings_types__building_type` DROP FOREIGN KEY `FK_e96fc126a89634f35a721373403`", undefined);
        await queryRunner.query("ALTER TABLE `building_position_buildings_types__building_type` DROP FOREIGN KEY `FK_14d71138956c1a2da63839c08ea`", undefined);
        await queryRunner.query("ALTER TABLE `LocomotiveTypeUpgradeBuffer` DROP FOREIGN KEY `FK_43dc1bdffe417ed83981a3487e2`", undefined);
        await queryRunner.query("ALTER TABLE `LocomotiveTypeUpgradeBuffer` DROP FOREIGN KEY `FK_c343138e54d5b24dff964d96bdb`", undefined);
        await queryRunner.query("ALTER TABLE `LocomotivesUpgrades` DROP FOREIGN KEY `FK_b9f7b0bcabe8c3ba5174ba8d3f8`", undefined);
        await queryRunner.query("ALTER TABLE `LocomotivesUpgrades` DROP FOREIGN KEY `FK_d4813fcb0178d7a72fd69414957`", undefined);
        await queryRunner.query("ALTER TABLE `CarriagesUpgrades` DROP FOREIGN KEY `FK_1f3b2ac4698bbb93a127f33a2fd`", undefined);
        await queryRunner.query("ALTER TABLE `CarriagesUpgrades` DROP FOREIGN KEY `FK_703e3ea79519cf77557beeaae14`", undefined);
        await queryRunner.query("ALTER TABLE `ItemType` DROP FOREIGN KEY `FK_3843943da1fcce996f93f5ee12e`", undefined);
        await queryRunner.query("ALTER TABLE `ItemType` DROP FOREIGN KEY `FK_5fc1920c43a3ab81a2c3cc81f02`", undefined);
        await queryRunner.query("ALTER TABLE `ItemType` DROP FOREIGN KEY `FK_8022f534012e72f2f4f86181aa4`", undefined);
        await queryRunner.query("ALTER TABLE `ItemTypeBuffer` DROP FOREIGN KEY `FK_2802c4f959e4a849cbd33f504b7`", undefined);
        await queryRunner.query("ALTER TABLE `ItemTypeBuffer` DROP FOREIGN KEY `FK_9b5a359ca7cf647cbdb12481408`", undefined);
        await queryRunner.query("ALTER TABLE `ItemTypeBuffer` DROP FOREIGN KEY `FK_445be8860b376e144084abc789d`", undefined);
        await queryRunner.query("ALTER TABLE `BuildingPosition` DROP FOREIGN KEY `FK_09c207597ab9785cb728232632d`", undefined);
        await queryRunner.query("DROP INDEX `IDX_e96fc126a89634f35a72137340` ON `building_position_buildings_types__building_type`", undefined);
        await queryRunner.query("DROP INDEX `IDX_14d71138956c1a2da63839c08e` ON `building_position_buildings_types__building_type`", undefined);
        await queryRunner.query("DROP TABLE `building_position_buildings_types__building_type`", undefined);
        await queryRunner.query("DROP TABLE `administator`", undefined);
        await queryRunner.query("DROP TABLE `LocomotiveTypes`", undefined);
        await queryRunner.query("DROP TABLE `LocomotiveTypeBuffer`", undefined);
        await queryRunner.query("DROP INDEX `REL_c343138e54d5b24dff964d96bd` ON `LocomotiveTypeUpgradeBuffer`", undefined);
        await queryRunner.query("DROP TABLE `LocomotiveTypeUpgradeBuffer`", undefined);
        await queryRunner.query("DROP INDEX `REL_d4813fcb0178d7a72fd6941495` ON `LocomotivesUpgrades`", undefined);
        await queryRunner.query("DROP TABLE `LocomotivesUpgrades`", undefined);
        await queryRunner.query("DROP INDEX `REL_703e3ea79519cf77557beeaae1` ON `CarriagesUpgrades`", undefined);
        await queryRunner.query("DROP TABLE `CarriagesUpgrades`", undefined);
        await queryRunner.query("DROP INDEX `REL_3843943da1fcce996f93f5ee12` ON `ItemType`", undefined);
        await queryRunner.query("DROP TABLE `ItemType`", undefined);
        await queryRunner.query("DROP INDEX `REL_2802c4f959e4a849cbd33f504b` ON `ItemTypeBuffer`", undefined);
        await queryRunner.query("DROP TABLE `ItemTypeBuffer`", undefined);
        await queryRunner.query("DROP TABLE `ItemsRarity`", undefined);
        await queryRunner.query("DROP TABLE `ItemsType`", undefined);
        await queryRunner.query("DROP TABLE `CarriageTypes`", undefined);
        await queryRunner.query("DROP TABLE `BuildingPosition`", undefined);
        await queryRunner.query("DROP TABLE `BuildingType`", undefined);
    }

}
