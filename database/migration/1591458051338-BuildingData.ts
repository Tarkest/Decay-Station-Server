import {MigrationInterface, QueryRunner} from "typeorm";

export class BuildingData1591458051338 implements MigrationInterface {
    name = 'BuildingData1591458051338'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `building_data_buffer` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `size` int NOT NULL, `typeId` int NULL, `currentVersionId` int NULL, UNIQUE INDEX `REL_960d79889d205ee55a6a430a74` (`currentVersionId`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `building_data` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `size` int NOT NULL, `typeId` int NULL, `updateBufferId` int NULL, UNIQUE INDEX `REL_89fa3028be6f66893af2465f89` (`updateBufferId`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `building_data_buffer` ADD CONSTRAINT `FK_69567128c93d3fd0a2430177008` FOREIGN KEY (`typeId`) REFERENCES `building_type`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `building_data_buffer` ADD CONSTRAINT `FK_960d79889d205ee55a6a430a741` FOREIGN KEY (`currentVersionId`) REFERENCES `building_data`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `building_data` ADD CONSTRAINT `FK_130ed179bd9c17361e3b3f991e6` FOREIGN KEY (`typeId`) REFERENCES `building_type`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `building_data` ADD CONSTRAINT `FK_89fa3028be6f66893af2465f896` FOREIGN KEY (`updateBufferId`) REFERENCES `building_data_buffer`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `building_data` DROP FOREIGN KEY `FK_89fa3028be6f66893af2465f896`", undefined);
        await queryRunner.query("ALTER TABLE `building_data` DROP FOREIGN KEY `FK_130ed179bd9c17361e3b3f991e6`", undefined);
        await queryRunner.query("ALTER TABLE `building_data_buffer` DROP FOREIGN KEY `FK_960d79889d205ee55a6a430a741`", undefined);
        await queryRunner.query("ALTER TABLE `building_data_buffer` DROP FOREIGN KEY `FK_69567128c93d3fd0a2430177008`", undefined);
        await queryRunner.query("DROP INDEX `REL_89fa3028be6f66893af2465f89` ON `building_data`", undefined);
        await queryRunner.query("DROP TABLE `building_data`", undefined);
        await queryRunner.query("DROP INDEX `REL_960d79889d205ee55a6a430a74` ON `building_data_buffer`", undefined);
        await queryRunner.query("DROP TABLE `building_data_buffer`", undefined);
    }

}
