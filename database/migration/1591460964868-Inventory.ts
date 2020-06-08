import {MigrationInterface, QueryRunner} from "typeorm";

export class Inventory1591460964868 implements MigrationInterface {
    name = 'Inventory1591460964868'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `inventory_slot` (`id` int NOT NULL AUTO_INCREMENT, `count` int NOT NULL DEFAULT 0, `itemId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `inventory_slot` ADD CONSTRAINT `FK_447b0012a79523817528f6098ac` FOREIGN KEY (`itemId`) REFERENCES `item_data`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `inventory_slot` DROP FOREIGN KEY `FK_447b0012a79523817528f6098ac`", undefined);
        await queryRunner.query("DROP TABLE `inventory_slot`", undefined);
    }

}
