import {MigrationInterface, QueryRunner} from "typeorm";

export class CrewMember1591571406789 implements MigrationInterface {
    name = 'CrewMember1591571406789'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `crew_member` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `strength` decimal(2,2) NOT NULL, `agility` decimal(2,2) NOT NULL, `intelligence` decimal(2,2) NOT NULL, `carriageId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `inventory_slot` ADD `crewMemberId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `inventory_slot` ADD `crewMemberEquipmentId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `crew_member` ADD CONSTRAINT `FK_e1e40a6319872a5ee729c0a9a3f` FOREIGN KEY (`carriageId`) REFERENCES `carriage`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `inventory_slot` ADD CONSTRAINT `FK_a615a43006b0e509b2e1e6d8219` FOREIGN KEY (`crewMemberId`) REFERENCES `crew_member`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `inventory_slot` ADD CONSTRAINT `FK_31822dcfd9d4a2a44f0ba22419e` FOREIGN KEY (`crewMemberEquipmentId`) REFERENCES `crew_member`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `inventory_slot` DROP FOREIGN KEY `FK_31822dcfd9d4a2a44f0ba22419e`", undefined);
        await queryRunner.query("ALTER TABLE `inventory_slot` DROP FOREIGN KEY `FK_a615a43006b0e509b2e1e6d8219`", undefined);
        await queryRunner.query("ALTER TABLE `crew_member` DROP FOREIGN KEY `FK_e1e40a6319872a5ee729c0a9a3f`", undefined);
        await queryRunner.query("ALTER TABLE `inventory_slot` DROP COLUMN `crewMemberEquipmentId`", undefined);
        await queryRunner.query("ALTER TABLE `inventory_slot` DROP COLUMN `crewMemberId`", undefined);
        await queryRunner.query("DROP TABLE `crew_member`", undefined);
    }

}
