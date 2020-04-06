import {MigrationInterface, QueryRunner} from "typeorm";

export class Types1586213672019 implements MigrationInterface {
    name = 'Types1586213672019'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `ItemDataBuffer` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `maxCount` int NOT NULL, `typeId` int NULL, `rarityId` int NULL, `currentVersionId` int NULL, UNIQUE INDEX `REL_ac3e3bf9e8d4ca65a3a272e5a1` (`currentVersionId`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `ItemData` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `inRotation` tinyint NOT NULL, `maxCount` int NOT NULL, `typeId` int NULL, `rarityId` int NULL, `updateBufferId` int NULL, UNIQUE INDEX `REL_af458cd1b82c57100c019ddf17` (`updateBufferId`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `LocomotivesUpgradesData` (`id` int NOT NULL AUTO_INCREMENT, `count` int NOT NULL, `level` int NOT NULL, `itemId` int NULL, `locomotiveDataId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `LocomotiveUpgradesDataBuffer` (`id` int NOT NULL AUTO_INCREMENT, `count` int NOT NULL, `level` int NOT NULL, `itemId` int NULL, `locomotiveDataId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `LocomotivesBuildingSlotsDataBuffer` (`id` int NOT NULL AUTO_INCREMENT, `level` int NOT NULL, `buildingTypeId` int NULL, `locomotiveDataId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `LocomotiveDataBuffer` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `maxLevel` int NOT NULL, `currentVersionId` int NULL, UNIQUE INDEX `REL_52fc0054eb7c067bcb86207273` (`currentVersionId`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `LocomotiveData` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `maxLevel` int NOT NULL, `inRotation` tinyint NOT NULL, `updateBufferId` int NULL, UNIQUE INDEX `REL_d6d0a0f21c498e8f562cb0162b` (`updateBufferId`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `LocomotivesBuildingSlotsData` (`id` int NOT NULL AUTO_INCREMENT, `level` int NOT NULL, `buildingTypeId` int NULL, `locomotiveDataId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `BuildingType` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `ItemsType` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `ItemsRarity` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `CarriageBuildingSlot` (`id` int NOT NULL AUTO_INCREMENT, `buildingSize` int NOT NULL, `buildingTypeId` int NULL, `carriageDataId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `CarriageAssemblyItemBufferData` (`id` int NOT NULL AUTO_INCREMENT, `count` int NOT NULL, `itemId` int NULL, `carriageDataId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `CarriageBuildingSlotBuffer` (`id` int NOT NULL AUTO_INCREMENT, `buildingSize` int NOT NULL, `buildingTypeId` int NULL, `carriageDataId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `CarriageDataBuffer` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `storageCapacity` int NOT NULL, `crewCapacity` int NOT NULL, `currentVersionId` int NULL, UNIQUE INDEX `REL_851682d62c85225a900cf1fea1` (`currentVersionId`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `CarriageData` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `inRotation` tinyint NOT NULL, `storageCapacity` int NOT NULL, `crewCapacity` int NOT NULL, `updateBufferId` int NULL, UNIQUE INDEX `REL_8f5ad542e9cb6fe703eacb4b9d` (`updateBufferId`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `CarriageAssemblyItemData` (`id` int NOT NULL AUTO_INCREMENT, `count` int NOT NULL, `itemId` int NULL, `carriageDataId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `Administation` (`id` int NOT NULL AUTO_INCREMENT, `login` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `ItemDataBuffer` ADD CONSTRAINT `FK_57d1838379fe20932dda5d4dab6` FOREIGN KEY (`typeId`) REFERENCES `ItemsType`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `ItemDataBuffer` ADD CONSTRAINT `FK_fef11c5c08291c76dcd29dc23ed` FOREIGN KEY (`rarityId`) REFERENCES `ItemsRarity`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `ItemDataBuffer` ADD CONSTRAINT `FK_ac3e3bf9e8d4ca65a3a272e5a14` FOREIGN KEY (`currentVersionId`) REFERENCES `ItemData`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `ItemData` ADD CONSTRAINT `FK_b905d23c37b299fa3a50607abb1` FOREIGN KEY (`typeId`) REFERENCES `ItemsType`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `ItemData` ADD CONSTRAINT `FK_cf2340ae96027b2d10bb9544794` FOREIGN KEY (`rarityId`) REFERENCES `ItemsRarity`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `ItemData` ADD CONSTRAINT `FK_af458cd1b82c57100c019ddf17c` FOREIGN KEY (`updateBufferId`) REFERENCES `ItemDataBuffer`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `LocomotivesUpgradesData` ADD CONSTRAINT `FK_53436a6478fb1cd328b3b62db7f` FOREIGN KEY (`itemId`) REFERENCES `ItemData`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `LocomotivesUpgradesData` ADD CONSTRAINT `FK_c1da8044632b31080ed8e9c8227` FOREIGN KEY (`locomotiveDataId`) REFERENCES `LocomotiveData`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `LocomotiveUpgradesDataBuffer` ADD CONSTRAINT `FK_acd5a756428d973cca3a02a0178` FOREIGN KEY (`itemId`) REFERENCES `ItemData`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `LocomotiveUpgradesDataBuffer` ADD CONSTRAINT `FK_36bec8b29b2876ff227ceee8d84` FOREIGN KEY (`locomotiveDataId`) REFERENCES `LocomotiveDataBuffer`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `LocomotivesBuildingSlotsDataBuffer` ADD CONSTRAINT `FK_c5e537eabe0ccfd8b15bd6e426b` FOREIGN KEY (`buildingTypeId`) REFERENCES `BuildingType`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `LocomotivesBuildingSlotsDataBuffer` ADD CONSTRAINT `FK_fa3a599626f47a240053345021f` FOREIGN KEY (`locomotiveDataId`) REFERENCES `LocomotiveDataBuffer`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `LocomotiveDataBuffer` ADD CONSTRAINT `FK_52fc0054eb7c067bcb862072736` FOREIGN KEY (`currentVersionId`) REFERENCES `LocomotiveData`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `LocomotiveData` ADD CONSTRAINT `FK_d6d0a0f21c498e8f562cb0162be` FOREIGN KEY (`updateBufferId`) REFERENCES `LocomotiveDataBuffer`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `LocomotivesBuildingSlotsData` ADD CONSTRAINT `FK_de953894b58775f3f41b4d25236` FOREIGN KEY (`buildingTypeId`) REFERENCES `BuildingType`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `LocomotivesBuildingSlotsData` ADD CONSTRAINT `FK_49093a65ad1ea24a39c8aea295d` FOREIGN KEY (`locomotiveDataId`) REFERENCES `LocomotiveData`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `CarriageBuildingSlot` ADD CONSTRAINT `FK_76ab60b438caafbefcc931b3493` FOREIGN KEY (`buildingTypeId`) REFERENCES `BuildingType`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `CarriageBuildingSlot` ADD CONSTRAINT `FK_9e5575e5c4b4e1129b50e218d08` FOREIGN KEY (`carriageDataId`) REFERENCES `CarriageData`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `CarriageAssemblyItemBufferData` ADD CONSTRAINT `FK_78478c1ea2841e38d13b33c5322` FOREIGN KEY (`itemId`) REFERENCES `ItemData`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `CarriageAssemblyItemBufferData` ADD CONSTRAINT `FK_3688539f35e73500bbc6f13c63a` FOREIGN KEY (`carriageDataId`) REFERENCES `CarriageDataBuffer`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `CarriageBuildingSlotBuffer` ADD CONSTRAINT `FK_99bcf4ebf959911166ded9e21ae` FOREIGN KEY (`buildingTypeId`) REFERENCES `BuildingType`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `CarriageBuildingSlotBuffer` ADD CONSTRAINT `FK_0199956fc3866ab71ce4fc60a7e` FOREIGN KEY (`carriageDataId`) REFERENCES `CarriageDataBuffer`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `CarriageDataBuffer` ADD CONSTRAINT `FK_851682d62c85225a900cf1fea1b` FOREIGN KEY (`currentVersionId`) REFERENCES `CarriageData`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `CarriageData` ADD CONSTRAINT `FK_8f5ad542e9cb6fe703eacb4b9dd` FOREIGN KEY (`updateBufferId`) REFERENCES `CarriageDataBuffer`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `CarriageAssemblyItemData` ADD CONSTRAINT `FK_824816e896edaa863148d2c71d6` FOREIGN KEY (`itemId`) REFERENCES `ItemData`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `CarriageAssemblyItemData` ADD CONSTRAINT `FK_c86f8b3335c67675c26c5355be8` FOREIGN KEY (`carriageDataId`) REFERENCES `CarriageData`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("INSERT INTO `Administation`(`login`, `password`) VALUES (?, ?)", ["Test", "$2y$12$FXjyohA9zMFOBWiOD0f85OrJJGvQbNH8v.h3Uxb3adw5L75GrvlNy"]);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `CarriageAssemblyItemData` DROP FOREIGN KEY `FK_c86f8b3335c67675c26c5355be8`", undefined);
        await queryRunner.query("ALTER TABLE `CarriageAssemblyItemData` DROP FOREIGN KEY `FK_824816e896edaa863148d2c71d6`", undefined);
        await queryRunner.query("ALTER TABLE `CarriageData` DROP FOREIGN KEY `FK_8f5ad542e9cb6fe703eacb4b9dd`", undefined);
        await queryRunner.query("ALTER TABLE `CarriageDataBuffer` DROP FOREIGN KEY `FK_851682d62c85225a900cf1fea1b`", undefined);
        await queryRunner.query("ALTER TABLE `CarriageBuildingSlotBuffer` DROP FOREIGN KEY `FK_0199956fc3866ab71ce4fc60a7e`", undefined);
        await queryRunner.query("ALTER TABLE `CarriageBuildingSlotBuffer` DROP FOREIGN KEY `FK_99bcf4ebf959911166ded9e21ae`", undefined);
        await queryRunner.query("ALTER TABLE `CarriageAssemblyItemBufferData` DROP FOREIGN KEY `FK_3688539f35e73500bbc6f13c63a`", undefined);
        await queryRunner.query("ALTER TABLE `CarriageAssemblyItemBufferData` DROP FOREIGN KEY `FK_78478c1ea2841e38d13b33c5322`", undefined);
        await queryRunner.query("ALTER TABLE `CarriageBuildingSlot` DROP FOREIGN KEY `FK_9e5575e5c4b4e1129b50e218d08`", undefined);
        await queryRunner.query("ALTER TABLE `CarriageBuildingSlot` DROP FOREIGN KEY `FK_76ab60b438caafbefcc931b3493`", undefined);
        await queryRunner.query("ALTER TABLE `LocomotivesBuildingSlotsData` DROP FOREIGN KEY `FK_49093a65ad1ea24a39c8aea295d`", undefined);
        await queryRunner.query("ALTER TABLE `LocomotivesBuildingSlotsData` DROP FOREIGN KEY `FK_de953894b58775f3f41b4d25236`", undefined);
        await queryRunner.query("ALTER TABLE `LocomotiveData` DROP FOREIGN KEY `FK_d6d0a0f21c498e8f562cb0162be`", undefined);
        await queryRunner.query("ALTER TABLE `LocomotiveDataBuffer` DROP FOREIGN KEY `FK_52fc0054eb7c067bcb862072736`", undefined);
        await queryRunner.query("ALTER TABLE `LocomotivesBuildingSlotsDataBuffer` DROP FOREIGN KEY `FK_fa3a599626f47a240053345021f`", undefined);
        await queryRunner.query("ALTER TABLE `LocomotivesBuildingSlotsDataBuffer` DROP FOREIGN KEY `FK_c5e537eabe0ccfd8b15bd6e426b`", undefined);
        await queryRunner.query("ALTER TABLE `LocomotiveUpgradesDataBuffer` DROP FOREIGN KEY `FK_36bec8b29b2876ff227ceee8d84`", undefined);
        await queryRunner.query("ALTER TABLE `LocomotiveUpgradesDataBuffer` DROP FOREIGN KEY `FK_acd5a756428d973cca3a02a0178`", undefined);
        await queryRunner.query("ALTER TABLE `LocomotivesUpgradesData` DROP FOREIGN KEY `FK_c1da8044632b31080ed8e9c8227`", undefined);
        await queryRunner.query("ALTER TABLE `LocomotivesUpgradesData` DROP FOREIGN KEY `FK_53436a6478fb1cd328b3b62db7f`", undefined);
        await queryRunner.query("ALTER TABLE `ItemData` DROP FOREIGN KEY `FK_af458cd1b82c57100c019ddf17c`", undefined);
        await queryRunner.query("ALTER TABLE `ItemData` DROP FOREIGN KEY `FK_cf2340ae96027b2d10bb9544794`", undefined);
        await queryRunner.query("ALTER TABLE `ItemData` DROP FOREIGN KEY `FK_b905d23c37b299fa3a50607abb1`", undefined);
        await queryRunner.query("ALTER TABLE `ItemDataBuffer` DROP FOREIGN KEY `FK_ac3e3bf9e8d4ca65a3a272e5a14`", undefined);
        await queryRunner.query("ALTER TABLE `ItemDataBuffer` DROP FOREIGN KEY `FK_fef11c5c08291c76dcd29dc23ed`", undefined);
        await queryRunner.query("ALTER TABLE `ItemDataBuffer` DROP FOREIGN KEY `FK_57d1838379fe20932dda5d4dab6`", undefined);
        await queryRunner.query("DROP TABLE `Administation`", undefined);
        await queryRunner.query("DROP TABLE `CarriageAssemblyItemData`", undefined);
        await queryRunner.query("DROP INDEX `REL_8f5ad542e9cb6fe703eacb4b9d` ON `CarriageData`", undefined);
        await queryRunner.query("DROP TABLE `CarriageData`", undefined);
        await queryRunner.query("DROP INDEX `REL_851682d62c85225a900cf1fea1` ON `CarriageDataBuffer`", undefined);
        await queryRunner.query("DROP TABLE `CarriageDataBuffer`", undefined);
        await queryRunner.query("DROP TABLE `CarriageBuildingSlotBuffer`", undefined);
        await queryRunner.query("DROP TABLE `CarriageAssemblyItemBufferData`", undefined);
        await queryRunner.query("DROP TABLE `CarriageBuildingSlot`", undefined);
        await queryRunner.query("DROP TABLE `ItemsRarity`", undefined);
        await queryRunner.query("DROP TABLE `ItemsType`", undefined);
        await queryRunner.query("DROP TABLE `BuildingType`", undefined);
        await queryRunner.query("DROP TABLE `LocomotivesBuildingSlotsData`", undefined);
        await queryRunner.query("DROP INDEX `REL_d6d0a0f21c498e8f562cb0162b` ON `LocomotiveData`", undefined);
        await queryRunner.query("DROP TABLE `LocomotiveData`", undefined);
        await queryRunner.query("DROP INDEX `REL_52fc0054eb7c067bcb86207273` ON `LocomotiveDataBuffer`", undefined);
        await queryRunner.query("DROP TABLE `LocomotiveDataBuffer`", undefined);
        await queryRunner.query("DROP TABLE `LocomotivesBuildingSlotsDataBuffer`", undefined);
        await queryRunner.query("DROP TABLE `LocomotiveUpgradesDataBuffer`", undefined);
        await queryRunner.query("DROP TABLE `LocomotivesUpgradesData`", undefined);
        await queryRunner.query("DROP INDEX `REL_af458cd1b82c57100c019ddf17` ON `ItemData`", undefined);
        await queryRunner.query("DROP TABLE `ItemData`", undefined);
        await queryRunner.query("DROP INDEX `REL_ac3e3bf9e8d4ca65a3a272e5a1` ON `ItemDataBuffer`", undefined);
        await queryRunner.query("DROP TABLE `ItemDataBuffer`", undefined);
    }

}
