import {MigrationInterface, QueryRunner} from "typeorm";

export class Building1591649364573 implements MigrationInterface {
    name = 'Building1591649364573'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP INDEX `IDX_fefc6ebd9f26c9bdf178372470` ON `locomotive`", undefined);
        await queryRunner.query("CREATE TABLE `building` (`id` int NOT NULL AUTO_INCREMENT, `buildingDataId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `locomotive_building` ADD `currentBuildingId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `locomotive_building` ADD CONSTRAINT `FK_f49e3a3bde0563f6fab97605f29` FOREIGN KEY (`currentBuildingId`) REFERENCES `building`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `building` ADD CONSTRAINT `FK_2e5ac7f336fce6360142f2b8a15` FOREIGN KEY (`buildingDataId`) REFERENCES `building_data`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `building` DROP FOREIGN KEY `FK_2e5ac7f336fce6360142f2b8a15`", undefined);
        await queryRunner.query("ALTER TABLE `locomotive_building` DROP FOREIGN KEY `FK_f49e3a3bde0563f6fab97605f29`", undefined);
        await queryRunner.query("ALTER TABLE `locomotive_building` DROP COLUMN `currentBuildingId`", undefined);
        await queryRunner.query("DROP TABLE `building`", undefined);
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_fefc6ebd9f26c9bdf178372470` ON `locomotive` (`accountId`)", undefined);
    }

}
