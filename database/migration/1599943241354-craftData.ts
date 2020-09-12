import {MigrationInterface, QueryRunner} from "typeorm";

export class craftData1599943241354 implements MigrationInterface {
    name = 'craftData1599943241354'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `craft_data` (`id` int NOT NULL AUTO_INCREMENT, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `time_stamp` ADD `craftDataId` int NULL");
        await queryRunner.query("ALTER TABLE `time_stamp` ADD UNIQUE INDEX `IDX_540ee3436dc42b317ba323eb6f` (`craftDataId`)");
        await queryRunner.query("CREATE UNIQUE INDEX `REL_540ee3436dc42b317ba323eb6f` ON `time_stamp` (`craftDataId`)");
        await queryRunner.query("ALTER TABLE `time_stamp` ADD CONSTRAINT `FK_540ee3436dc42b317ba323eb6f0` FOREIGN KEY (`craftDataId`) REFERENCES `craft_data`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `time_stamp` DROP FOREIGN KEY `FK_540ee3436dc42b317ba323eb6f0`");
        await queryRunner.query("DROP INDEX `REL_540ee3436dc42b317ba323eb6f` ON `time_stamp`");
        await queryRunner.query("ALTER TABLE `time_stamp` DROP INDEX `IDX_540ee3436dc42b317ba323eb6f`");
        await queryRunner.query("ALTER TABLE `time_stamp` DROP COLUMN `craftDataId`");
        await queryRunner.query("DROP TABLE `craft_data`");
    }

}
