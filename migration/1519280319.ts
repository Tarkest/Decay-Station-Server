import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class UserSoftDelete2303199694450 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.addColumn("Users", new TableColumn({
            name: "isDeleted",
            type: "boolean",
            default: false
        }))
    }

    async down(queryRunner: QueryRunner): Promise<any> {

    }


}