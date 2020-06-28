import {MigrationInterface, QueryRunner} from "typeorm";

export class CrewMemberCharacteristicUpdate1593380458624 implements MigrationInterface {
    name = 'CrewMemberCharacteristicUpdate1593380458624'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IDX_1120bacb12913b13ce02e66f60` ON `crew_member`");
        await queryRunner.query("ALTER TABLE `crew_member` CHANGE `strength` `strength` decimal(4,2) NOT NULL");
        await queryRunner.query("ALTER TABLE `crew_member` CHANGE `agility` `agility` decimal(4,2) NOT NULL");
        await queryRunner.query("ALTER TABLE `crew_member` CHANGE `intelligence` `intelligence` decimal(4,2) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `crew_member` CHANGE `intelligence` `intelligence` decimal(2,2) NOT NULL");
        await queryRunner.query("ALTER TABLE `crew_member` CHANGE `agility` `agility` decimal(2,2) NOT NULL");
        await queryRunner.query("ALTER TABLE `crew_member` CHANGE `strength` `strength` decimal(2,2) NOT NULL");
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_1120bacb12913b13ce02e66f60` ON `crew_member` (`accountId`)");
    }

}
