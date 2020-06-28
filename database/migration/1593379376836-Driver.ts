import {MigrationInterface, QueryRunner} from "typeorm";

export class Driver1593379376836 implements MigrationInterface {
    name = 'Driver1593379376836'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `carriage_building` DROP FOREIGN KEY `FK_330dd7867e17785caa37d1f65f9`");
        await queryRunner.query("ALTER TABLE `crew_member` ADD `accountId` int NULL");
        await queryRunner.query("ALTER TABLE `crew_member` ADD UNIQUE INDEX `IDX_1120bacb12913b13ce02e66f60` (`accountId`)");
        await queryRunner.query("CREATE UNIQUE INDEX `REL_1120bacb12913b13ce02e66f60` ON `crew_member` (`accountId`)");
        await queryRunner.query("ALTER TABLE `crew_member` ADD CONSTRAINT `FK_1120bacb12913b13ce02e66f603` FOREIGN KEY (`accountId`) REFERENCES `account_data`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `carriage_building` ADD CONSTRAINT `FK_330dd7867e17785caa37d1f65f9` FOREIGN KEY (`currentBuildingId`) REFERENCES `building`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `carriage_building` DROP FOREIGN KEY `FK_330dd7867e17785caa37d1f65f9`");
        await queryRunner.query("ALTER TABLE `crew_member` DROP FOREIGN KEY `FK_1120bacb12913b13ce02e66f603`");
        await queryRunner.query("DROP INDEX `REL_1120bacb12913b13ce02e66f60` ON `crew_member`");
        await queryRunner.query("ALTER TABLE `crew_member` DROP INDEX `IDX_1120bacb12913b13ce02e66f60`");
        await queryRunner.query("ALTER TABLE `crew_member` DROP COLUMN `accountId`");
        await queryRunner.query("ALTER TABLE `carriage_building` ADD CONSTRAINT `FK_330dd7867e17785caa37d1f65f9` FOREIGN KEY (`currentBuildingId`) REFERENCES `building_data`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION");
    }

}
