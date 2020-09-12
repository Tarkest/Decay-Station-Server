import {MigrationInterface, QueryRunner} from "typeorm";

export class TimeStamp1595629818717 implements MigrationInterface {
    name = 'TimeStamp1595629818717'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `time_stamp` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `endAt` date NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `time_stamp`");
    }

}
