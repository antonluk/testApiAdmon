import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCategoryTable1730211011051 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "categories",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                    comment: 'Ид'
                },
                {
                    name: "name",
                    type: "varchar",
                    comment: 'Наименование категории'           
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("categories");
    }
}
