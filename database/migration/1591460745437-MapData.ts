import {MigrationInterface, QueryRunner} from "typeorm";

export class MapData1591460745437 implements MigrationInterface {
    name = 'MapData1591460745437'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `sector_data` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `positionX` int NOT NULL, `positionY` int NOT NULL, `environmentId` int NULL, `updateBufferId` int NULL, UNIQUE INDEX `REL_9ead9eb0e7f2e8645d46439e19` (`updateBufferId`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `sector_data_buffer` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `positionX` int NOT NULL, `positionY` int NOT NULL, `environmentId` int NULL, `currentVersionId` int NULL, UNIQUE INDEX `REL_8a5d03652f37162d326af420e3` (`currentVersionId`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `sector_data` ADD CONSTRAINT `FK_9c053cd25d30c4bd4b6cdbddad2` FOREIGN KEY (`environmentId`) REFERENCES `environment_type`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `sector_data` ADD CONSTRAINT `FK_9ead9eb0e7f2e8645d46439e193` FOREIGN KEY (`updateBufferId`) REFERENCES `sector_data_buffer`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `sector_data_buffer` ADD CONSTRAINT `FK_230658f5f7efa385e0b6597bca8` FOREIGN KEY (`environmentId`) REFERENCES `environment_type`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `sector_data_buffer` ADD CONSTRAINT `FK_8a5d03652f37162d326af420e3d` FOREIGN KEY (`currentVersionId`) REFERENCES `sector_data`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `sector_data_buffer` DROP FOREIGN KEY `FK_8a5d03652f37162d326af420e3d`", undefined);
        await queryRunner.query("ALTER TABLE `sector_data_buffer` DROP FOREIGN KEY `FK_230658f5f7efa385e0b6597bca8`", undefined);
        await queryRunner.query("ALTER TABLE `sector_data` DROP FOREIGN KEY `FK_9ead9eb0e7f2e8645d46439e193`", undefined);
        await queryRunner.query("ALTER TABLE `sector_data` DROP FOREIGN KEY `FK_9c053cd25d30c4bd4b6cdbddad2`", undefined);
        await queryRunner.query("DROP INDEX `REL_8a5d03652f37162d326af420e3` ON `sector_data_buffer`", undefined);
        await queryRunner.query("DROP TABLE `sector_data_buffer`", undefined);
        await queryRunner.query("DROP INDEX `REL_9ead9eb0e7f2e8645d46439e19` ON `sector_data`", undefined);
        await queryRunner.query("DROP TABLE `sector_data`", undefined);
    }

}
