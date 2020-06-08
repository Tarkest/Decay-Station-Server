import {MigrationInterface, QueryRunner} from "typeorm";

export class ItemData1591457920149 implements MigrationInterface {
    name = 'ItemData1591457920149'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `item_data_buffer` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `maxCount` int NOT NULL, `typeId` int NULL, `rarityId` int NULL, `currentVersionId` int NULL, UNIQUE INDEX `REL_684fa6779b9219bbc829929e3f` (`currentVersionId`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `item_data` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `inRotation` tinyint NOT NULL, `maxCount` int NOT NULL, `typeId` int NULL, `rarityId` int NULL, `updateBufferId` int NULL, UNIQUE INDEX `REL_90d7d9696c7f44409e77ae1ca6` (`updateBufferId`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `item_data_buffer` ADD CONSTRAINT `FK_e720eed46a86091371d9632f813` FOREIGN KEY (`typeId`) REFERENCES `items_type`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `item_data_buffer` ADD CONSTRAINT `FK_f12ef4a18906e51ff749c18e0de` FOREIGN KEY (`rarityId`) REFERENCES `items_rarity`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `item_data_buffer` ADD CONSTRAINT `FK_684fa6779b9219bbc829929e3f3` FOREIGN KEY (`currentVersionId`) REFERENCES `item_data`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `item_data` ADD CONSTRAINT `FK_d72bf253637a859fccb58401abb` FOREIGN KEY (`typeId`) REFERENCES `items_type`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `item_data` ADD CONSTRAINT `FK_03d7a722e8f6c66538bed01da25` FOREIGN KEY (`rarityId`) REFERENCES `items_rarity`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `item_data` ADD CONSTRAINT `FK_90d7d9696c7f44409e77ae1ca60` FOREIGN KEY (`updateBufferId`) REFERENCES `item_data_buffer`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `item_data` DROP FOREIGN KEY `FK_90d7d9696c7f44409e77ae1ca60`", undefined);
        await queryRunner.query("ALTER TABLE `item_data` DROP FOREIGN KEY `FK_03d7a722e8f6c66538bed01da25`", undefined);
        await queryRunner.query("ALTER TABLE `item_data` DROP FOREIGN KEY `FK_d72bf253637a859fccb58401abb`", undefined);
        await queryRunner.query("ALTER TABLE `item_data_buffer` DROP FOREIGN KEY `FK_684fa6779b9219bbc829929e3f3`", undefined);
        await queryRunner.query("ALTER TABLE `item_data_buffer` DROP FOREIGN KEY `FK_f12ef4a18906e51ff749c18e0de`", undefined);
        await queryRunner.query("ALTER TABLE `item_data_buffer` DROP FOREIGN KEY `FK_e720eed46a86091371d9632f813`", undefined);
        await queryRunner.query("DROP INDEX `REL_90d7d9696c7f44409e77ae1ca6` ON `item_data`", undefined);
        await queryRunner.query("DROP TABLE `item_data`", undefined);
        await queryRunner.query("DROP INDEX `REL_684fa6779b9219bbc829929e3f` ON `item_data_buffer`", undefined);
        await queryRunner.query("DROP TABLE `item_data_buffer`", undefined);
    }

}
