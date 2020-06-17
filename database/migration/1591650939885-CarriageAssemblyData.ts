import {MigrationInterface, QueryRunner} from "typeorm";

export class CarriageAssemblyData1591650939885 implements MigrationInterface {
    name = 'CarriageAssemblyData1591650939885'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `carriage_assemble_slot` ADD `itemId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `carriage_assemble_slot` ADD CONSTRAINT `FK_ababd77d03089e2439c4875b280` FOREIGN KEY (`itemId`) REFERENCES `item_data`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `carriage_assemble_slot` DROP FOREIGN KEY `FK_ababd77d03089e2439c4875b280`", undefined);
        await queryRunner.query("ALTER TABLE `carriage_assemble_slot` DROP COLUMN `itemId`", undefined);
    }

}
