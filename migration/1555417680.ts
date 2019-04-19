import {MigrationInterface, QueryRunner, TableColumn, Table} from "typeorm";

const manufacturer = new Table({
    name: 'Manufacturers',
    columns: [
        {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated:true
        },
        {
            name: "name",
            type: "varchar",
        }
    ]
});

const manufacturerUserMapping = new Table({
    name: 'ManufacturerUserMappings',
    columns: [
        {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated:true
        },
        {
            name: "manufacturerId",
            type: "int",
        },
        {
            name: "userId",
            type: "int",
        }
    ],
    foreignKeys: [
        {
            referencedTableName: 'Manufacturers',
            columnNames: ['manufacturerId'],
            referencedColumnNames: ['id']
        },
        {
            referencedTableName: 'Users',
            columnNames: ['userId'],
            referencedColumnNames: ['id']
        }
    ]
});

export class Manufacturers1555411143382 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(manufacturer, true);
        await queryRunner.createTable(manufacturerUserMapping, true, true)
    }

    async down(queryRunner: QueryRunner): Promise<any> {

    }


}