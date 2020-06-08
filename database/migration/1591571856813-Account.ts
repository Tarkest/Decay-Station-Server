import {MigrationInterface, QueryRunner} from "typeorm";

export class Account1591571856813 implements MigrationInterface {
    name = 'Account1591571856813'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `account_data` (`id` int NOT NULL AUTO_INCREMENT, `userName` varchar(255) NOT NULL, `googleId` varchar(255) NOT NULL, `currentMapSectorId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `locomotive` ADD `accountId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `locomotive` ADD UNIQUE INDEX `IDX_fefc6ebd9f26c9bdf178372470` (`accountId`)", undefined);
        await queryRunner.query("ALTER TABLE `carriage` ADD `accountId` int NULL", undefined);
        await queryRunner.query("CREATE UNIQUE INDEX `REL_fefc6ebd9f26c9bdf178372470` ON `locomotive` (`accountId`)", undefined);
        await queryRunner.query("ALTER TABLE `locomotive` ADD CONSTRAINT `FK_fefc6ebd9f26c9bdf1783724701` FOREIGN KEY (`accountId`) REFERENCES `account_data`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `account_data` ADD CONSTRAINT `FK_b68f2c3d7a6d6b640d90652c1a0` FOREIGN KEY (`currentMapSectorId`) REFERENCES `sector_data`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `carriage` ADD CONSTRAINT `FK_d4987fd8f2deb5f82abc3a72245` FOREIGN KEY (`accountId`) REFERENCES `account_data`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `carriage` DROP FOREIGN KEY `FK_d4987fd8f2deb5f82abc3a72245`", undefined);
        await queryRunner.query("ALTER TABLE `account_data` DROP FOREIGN KEY `FK_b68f2c3d7a6d6b640d90652c1a0`", undefined);
        await queryRunner.query("ALTER TABLE `locomotive` DROP FOREIGN KEY `FK_fefc6ebd9f26c9bdf1783724701`", undefined);
        await queryRunner.query("DROP INDEX `REL_fefc6ebd9f26c9bdf178372470` ON `locomotive`", undefined);
        await queryRunner.query("ALTER TABLE `carriage` DROP COLUMN `accountId`", undefined);
        await queryRunner.query("ALTER TABLE `locomotive` DROP INDEX `IDX_fefc6ebd9f26c9bdf178372470`", undefined);
        await queryRunner.query("ALTER TABLE `locomotive` DROP COLUMN `accountId`", undefined);
        await queryRunner.query("DROP TABLE `account_data`", undefined);
    }

}
