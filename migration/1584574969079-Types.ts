import {MigrationInterface, QueryRunner} from "typeorm";

export class Types1584574969079 implements MigrationInterface {
    name = 'Types1584574969079'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `BuildingType` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `ItemDataBuffer` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `maxCount` int NOT NULL, `typeId` int NULL, `rarityId` int NULL, `currentVersionId` int NULL, UNIQUE INDEX `REL_ac3e3bf9e8d4ca65a3a272e5a1` (`currentVersionId`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `LocomotiveDataUpgradeBuffer` (`id` int NOT NULL AUTO_INCREMENT, `count` int NOT NULL, `level` int NOT NULL, `itemId` int NULL, `locomotiveDataId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `LocomotiveDataBuffer` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `maxLevel` int NOT NULL, `currentVersionId` int NULL, UNIQUE INDEX `REL_52fc0054eb7c067bcb86207273` (`currentVersionId`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `LocomotiveData` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `maxLevel` int NOT NULL, `inRotation` tinyint NOT NULL, `updateBufferId` int NULL, UNIQUE INDEX `REL_d6d0a0f21c498e8f562cb0162b` (`updateBufferId`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `LocomotivesUpgradesData` (`id` int NOT NULL AUTO_INCREMENT, `count` int NOT NULL, `level` int NOT NULL, `itemId` int NULL, `locomotiveDataId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `ItemData` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `inRotation` tinyint NOT NULL, `maxCount` int NOT NULL, `typeId` int NULL, `rarityId` int NULL, `updateBufferId` int NULL, UNIQUE INDEX `REL_af458cd1b82c57100c019ddf17` (`updateBufferId`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `ItemsType` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `ItemsRarity` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `administator` (`id` int NOT NULL AUTO_INCREMENT, `login` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `ItemDataBuffer` ADD CONSTRAINT `FK_57d1838379fe20932dda5d4dab6` FOREIGN KEY (`typeId`) REFERENCES `ItemsType`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `ItemDataBuffer` ADD CONSTRAINT `FK_fef11c5c08291c76dcd29dc23ed` FOREIGN KEY (`rarityId`) REFERENCES `ItemsRarity`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `ItemDataBuffer` ADD CONSTRAINT `FK_ac3e3bf9e8d4ca65a3a272e5a14` FOREIGN KEY (`currentVersionId`) REFERENCES `ItemData`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `LocomotiveDataUpgradeBuffer` ADD CONSTRAINT `FK_abdd91f50640437548394f37c00` FOREIGN KEY (`itemId`) REFERENCES `ItemData`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `LocomotiveDataUpgradeBuffer` ADD CONSTRAINT `FK_990e3d6bccae91846bb66362c2e` FOREIGN KEY (`locomotiveDataId`) REFERENCES `LocomotiveDataBuffer`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `LocomotiveDataBuffer` ADD CONSTRAINT `FK_52fc0054eb7c067bcb862072736` FOREIGN KEY (`currentVersionId`) REFERENCES `LocomotiveData`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `LocomotiveData` ADD CONSTRAINT `FK_d6d0a0f21c498e8f562cb0162be` FOREIGN KEY (`updateBufferId`) REFERENCES `LocomotiveDataBuffer`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `LocomotivesUpgradesData` ADD CONSTRAINT `FK_53436a6478fb1cd328b3b62db7f` FOREIGN KEY (`itemId`) REFERENCES `ItemData`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `LocomotivesUpgradesData` ADD CONSTRAINT `FK_c1da8044632b31080ed8e9c8227` FOREIGN KEY (`locomotiveDataId`) REFERENCES `LocomotiveData`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `ItemData` ADD CONSTRAINT `FK_b905d23c37b299fa3a50607abb1` FOREIGN KEY (`typeId`) REFERENCES `ItemsType`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `ItemData` ADD CONSTRAINT `FK_cf2340ae96027b2d10bb9544794` FOREIGN KEY (`rarityId`) REFERENCES `ItemsRarity`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `ItemData` ADD CONSTRAINT `FK_af458cd1b82c57100c019ddf17c` FOREIGN KEY (`updateBufferId`) REFERENCES `ItemDataBuffer`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("INSERT INTO `decay_station_db`.`administator`(`login`, `password`) VALUES (?, ?)", ['Test', '$2y$12$vOWMe0Ohr99l6K4S4mjE5.7LcD34GjFWFZY49RZJX.WVBmGY3jyqa']);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `ItemData` DROP FOREIGN KEY `FK_af458cd1b82c57100c019ddf17c`", undefined);
        await queryRunner.query("ALTER TABLE `ItemData` DROP FOREIGN KEY `FK_cf2340ae96027b2d10bb9544794`", undefined);
        await queryRunner.query("ALTER TABLE `ItemData` DROP FOREIGN KEY `FK_b905d23c37b299fa3a50607abb1`", undefined);
        await queryRunner.query("ALTER TABLE `LocomotivesUpgradesData` DROP FOREIGN KEY `FK_c1da8044632b31080ed8e9c8227`", undefined);
        await queryRunner.query("ALTER TABLE `LocomotivesUpgradesData` DROP FOREIGN KEY `FK_53436a6478fb1cd328b3b62db7f`", undefined);
        await queryRunner.query("ALTER TABLE `LocomotiveData` DROP FOREIGN KEY `FK_d6d0a0f21c498e8f562cb0162be`", undefined);
        await queryRunner.query("ALTER TABLE `LocomotiveDataBuffer` DROP FOREIGN KEY `FK_52fc0054eb7c067bcb862072736`", undefined);
        await queryRunner.query("ALTER TABLE `LocomotiveDataUpgradeBuffer` DROP FOREIGN KEY `FK_990e3d6bccae91846bb66362c2e`", undefined);
        await queryRunner.query("ALTER TABLE `LocomotiveDataUpgradeBuffer` DROP FOREIGN KEY `FK_abdd91f50640437548394f37c00`", undefined);
        await queryRunner.query("ALTER TABLE `ItemDataBuffer` DROP FOREIGN KEY `FK_ac3e3bf9e8d4ca65a3a272e5a14`", undefined);
        await queryRunner.query("ALTER TABLE `ItemDataBuffer` DROP FOREIGN KEY `FK_fef11c5c08291c76dcd29dc23ed`", undefined);
        await queryRunner.query("ALTER TABLE `ItemDataBuffer` DROP FOREIGN KEY `FK_57d1838379fe20932dda5d4dab6`", undefined);
        await queryRunner.query("DROP TABLE `administator`", undefined);
        await queryRunner.query("DROP TABLE `ItemsRarity`", undefined);
        await queryRunner.query("DROP TABLE `ItemsType`", undefined);
        await queryRunner.query("DROP INDEX `REL_af458cd1b82c57100c019ddf17` ON `ItemData`", undefined);
        await queryRunner.query("DROP TABLE `ItemData`", undefined);
        await queryRunner.query("DROP TABLE `LocomotivesUpgradesData`", undefined);
        await queryRunner.query("DROP INDEX `REL_d6d0a0f21c498e8f562cb0162b` ON `LocomotiveData`", undefined);
        await queryRunner.query("DROP TABLE `LocomotiveData`", undefined);
        await queryRunner.query("DROP INDEX `REL_52fc0054eb7c067bcb86207273` ON `LocomotiveDataBuffer`", undefined);
        await queryRunner.query("DROP TABLE `LocomotiveDataBuffer`", undefined);
        await queryRunner.query("DROP TABLE `LocomotiveDataUpgradeBuffer`", undefined);
        await queryRunner.query("DROP INDEX `REL_ac3e3bf9e8d4ca65a3a272e5a1` ON `ItemDataBuffer`", undefined);
        await queryRunner.query("DROP TABLE `ItemDataBuffer`", undefined);
        await queryRunner.query("DROP TABLE `BuildingType`", undefined);
    }

}
