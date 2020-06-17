import {MigrationInterface, QueryRunner} from "typeorm";

export class BuildingDataToRecipe1591655068725 implements MigrationInterface {
    name = 'BuildingDataToRecipe1591655068725'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `building_data_buffer_recipes_recipe_data` (`buildingDataBufferId` int NOT NULL, `recipeDataId` int NOT NULL, INDEX `IDX_528cd123213b72db8f71cd614f` (`buildingDataBufferId`), INDEX `IDX_e51281ef5e1e89a748922dcbda` (`recipeDataId`), PRIMARY KEY (`buildingDataBufferId`, `recipeDataId`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `building_data_recipes_recipe_data` (`buildingDataId` int NOT NULL, `recipeDataId` int NOT NULL, INDEX `IDX_d3574e7837e29a50e42c0ca4a8` (`buildingDataId`), INDEX `IDX_5527beb91fb2dd8dc36ec98182` (`recipeDataId`), PRIMARY KEY (`buildingDataId`, `recipeDataId`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `building_data_buffer_recipes_recipe_data` ADD CONSTRAINT `FK_528cd123213b72db8f71cd614f9` FOREIGN KEY (`buildingDataBufferId`) REFERENCES `building_data_buffer`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `building_data_buffer_recipes_recipe_data` ADD CONSTRAINT `FK_e51281ef5e1e89a748922dcbdac` FOREIGN KEY (`recipeDataId`) REFERENCES `recipe_data`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `building_data_recipes_recipe_data` ADD CONSTRAINT `FK_d3574e7837e29a50e42c0ca4a81` FOREIGN KEY (`buildingDataId`) REFERENCES `building_data`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `building_data_recipes_recipe_data` ADD CONSTRAINT `FK_5527beb91fb2dd8dc36ec98182f` FOREIGN KEY (`recipeDataId`) REFERENCES `recipe_data`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `building_data_recipes_recipe_data` DROP FOREIGN KEY `FK_5527beb91fb2dd8dc36ec98182f`", undefined);
        await queryRunner.query("ALTER TABLE `building_data_recipes_recipe_data` DROP FOREIGN KEY `FK_d3574e7837e29a50e42c0ca4a81`", undefined);
        await queryRunner.query("ALTER TABLE `building_data_buffer_recipes_recipe_data` DROP FOREIGN KEY `FK_e51281ef5e1e89a748922dcbdac`", undefined);
        await queryRunner.query("ALTER TABLE `building_data_buffer_recipes_recipe_data` DROP FOREIGN KEY `FK_528cd123213b72db8f71cd614f9`", undefined);
        await queryRunner.query("DROP INDEX `IDX_5527beb91fb2dd8dc36ec98182` ON `building_data_recipes_recipe_data`", undefined);
        await queryRunner.query("DROP INDEX `IDX_d3574e7837e29a50e42c0ca4a8` ON `building_data_recipes_recipe_data`", undefined);
        await queryRunner.query("DROP TABLE `building_data_recipes_recipe_data`", undefined);
        await queryRunner.query("DROP INDEX `IDX_e51281ef5e1e89a748922dcbda` ON `building_data_buffer_recipes_recipe_data`", undefined);
        await queryRunner.query("DROP INDEX `IDX_528cd123213b72db8f71cd614f` ON `building_data_buffer_recipes_recipe_data`", undefined);
        await queryRunner.query("DROP TABLE `building_data_buffer_recipes_recipe_data`", undefined);
    }

}
