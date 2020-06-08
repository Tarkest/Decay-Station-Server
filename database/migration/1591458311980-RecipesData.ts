import {MigrationInterface, QueryRunner} from "typeorm";

export class RecipesData1591458311980 implements MigrationInterface {
    name = 'RecipesData1591458311980'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `ingredient_to_recipe` (`id` int NOT NULL AUTO_INCREMENT, `count` int NOT NULL, `itemId` int NULL, `recipeId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `result_to_recipe` (`id` int NOT NULL AUTO_INCREMENT, `count` int NOT NULL, `dropChance` int NOT NULL, `itemId` int NULL, `recipeId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `ingredient_to_recipe_buffer` (`id` int NOT NULL AUTO_INCREMENT, `count` int NOT NULL, `itemId` int NULL, `recipeId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `result_to_recipe_buffer` (`id` int NOT NULL AUTO_INCREMENT, `count` int NOT NULL, `dropChance` int NOT NULL, `itemId` int NULL, `recipeId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `recipe_data_buffer` (`id` int NOT NULL AUTO_INCREMENT, `currentVersionId` int NULL, UNIQUE INDEX `REL_54b4d6c137750b5fa762154703` (`currentVersionId`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `recipe_data` (`id` int NOT NULL AUTO_INCREMENT, `inRotation` tinyint NOT NULL, `updateBufferId` int NULL, UNIQUE INDEX `REL_4fff4f5b89e2dba041ce4a3fab` (`updateBufferId`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `ingredient_to_recipe` ADD CONSTRAINT `FK_3e62be1206459055f6deb5c176b` FOREIGN KEY (`itemId`) REFERENCES `item_data`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `ingredient_to_recipe` ADD CONSTRAINT `FK_058421441bb2d4bdd3e5532ecb0` FOREIGN KEY (`recipeId`) REFERENCES `recipe_data`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `result_to_recipe` ADD CONSTRAINT `FK_bcf902e79c51edc3decbbc38b9e` FOREIGN KEY (`itemId`) REFERENCES `item_data`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `result_to_recipe` ADD CONSTRAINT `FK_84fab6695fb313a9b753b973b88` FOREIGN KEY (`recipeId`) REFERENCES `recipe_data`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `ingredient_to_recipe_buffer` ADD CONSTRAINT `FK_68adbf621df3028a01f9d968248` FOREIGN KEY (`itemId`) REFERENCES `item_data`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `ingredient_to_recipe_buffer` ADD CONSTRAINT `FK_375134376be98e898d4f554a7b5` FOREIGN KEY (`recipeId`) REFERENCES `recipe_data_buffer`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `result_to_recipe_buffer` ADD CONSTRAINT `FK_0ad581a7dcd33b1495fe0dcb5b8` FOREIGN KEY (`itemId`) REFERENCES `item_data`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `result_to_recipe_buffer` ADD CONSTRAINT `FK_6016d70f4848d2611aefee2f216` FOREIGN KEY (`recipeId`) REFERENCES `recipe_data_buffer`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `recipe_data_buffer` ADD CONSTRAINT `FK_54b4d6c137750b5fa7621547036` FOREIGN KEY (`currentVersionId`) REFERENCES `recipe_data`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `recipe_data` ADD CONSTRAINT `FK_4fff4f5b89e2dba041ce4a3fabd` FOREIGN KEY (`updateBufferId`) REFERENCES `recipe_data_buffer`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `recipe_data` DROP FOREIGN KEY `FK_4fff4f5b89e2dba041ce4a3fabd`", undefined);
        await queryRunner.query("ALTER TABLE `recipe_data_buffer` DROP FOREIGN KEY `FK_54b4d6c137750b5fa7621547036`", undefined);
        await queryRunner.query("ALTER TABLE `result_to_recipe_buffer` DROP FOREIGN KEY `FK_6016d70f4848d2611aefee2f216`", undefined);
        await queryRunner.query("ALTER TABLE `result_to_recipe_buffer` DROP FOREIGN KEY `FK_0ad581a7dcd33b1495fe0dcb5b8`", undefined);
        await queryRunner.query("ALTER TABLE `ingredient_to_recipe_buffer` DROP FOREIGN KEY `FK_375134376be98e898d4f554a7b5`", undefined);
        await queryRunner.query("ALTER TABLE `ingredient_to_recipe_buffer` DROP FOREIGN KEY `FK_68adbf621df3028a01f9d968248`", undefined);
        await queryRunner.query("ALTER TABLE `result_to_recipe` DROP FOREIGN KEY `FK_84fab6695fb313a9b753b973b88`", undefined);
        await queryRunner.query("ALTER TABLE `result_to_recipe` DROP FOREIGN KEY `FK_bcf902e79c51edc3decbbc38b9e`", undefined);
        await queryRunner.query("ALTER TABLE `ingredient_to_recipe` DROP FOREIGN KEY `FK_058421441bb2d4bdd3e5532ecb0`", undefined);
        await queryRunner.query("ALTER TABLE `ingredient_to_recipe` DROP FOREIGN KEY `FK_3e62be1206459055f6deb5c176b`", undefined);
        await queryRunner.query("DROP INDEX `REL_4fff4f5b89e2dba041ce4a3fab` ON `recipe_data`", undefined);
        await queryRunner.query("DROP TABLE `recipe_data`", undefined);
        await queryRunner.query("DROP INDEX `REL_54b4d6c137750b5fa762154703` ON `recipe_data_buffer`", undefined);
        await queryRunner.query("DROP TABLE `recipe_data_buffer`", undefined);
        await queryRunner.query("DROP TABLE `result_to_recipe_buffer`", undefined);
        await queryRunner.query("DROP TABLE `ingredient_to_recipe_buffer`", undefined);
        await queryRunner.query("DROP TABLE `result_to_recipe`", undefined);
        await queryRunner.query("DROP TABLE `ingredient_to_recipe`", undefined);
    }

}
