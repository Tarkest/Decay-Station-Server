import {MigrationInterface, QueryRunner} from "typeorm";

export class InventoryUserId1593184444926 implements MigrationInterface {
    name = 'InventoryUserId1593184444926'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `inventory_slot` ADD `userId` int NOT NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `inventory_slot` DROP COLUMN `userId`", undefined);
    }

}
