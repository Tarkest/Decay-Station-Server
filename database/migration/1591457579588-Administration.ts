import {MigrationInterface, QueryRunner} from "typeorm";

export class Administration1591457579588 implements MigrationInterface {
    name = 'Administration1591457579588'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `administrator` (`id` int NOT NULL AUTO_INCREMENT, `login` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("INSERT INTO `administrator`(`login`, `password`) VALUES (?, ?)", ["Test","$2y$12$FXjyohA9zMFOBWiOD0f85OrJJGvQbNH8v.h3Uxb3adw5L75GrvlNy"]);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP TABLE `administrator`", undefined);
    }

}
