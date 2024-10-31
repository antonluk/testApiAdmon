import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateTaskTable1730224902921 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "tasks",
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
                    name: "title",
                    type: "varchar",
                    comment: 'Заголовок задачи'
                },
                {
                    name: "description",
                    type: "varchar",
                    isNullable: true,
                    comment: 'Описание задачи'
                },
                {
                    name: "status",
                    type: "enum",
                    enum: ["PENDING", "IN_PROGRESS", "COMPLETED"],
                    default: "'PENDING'",
                    comment: 'Статус задачи'
                },
                {
                    name: "categoryId",
                    type: "int",
                    isNullable: true,
                    comment: 'ИД категории'
                },
                {
                    name: "responsibleId",
                    type: "int",
                    isNullable: true,
                    comment: 'ИД ответственного'
                }
            ]
        }));

        await Promise.all([
            queryRunner.createForeignKey(
                "tasks",
                new TableForeignKey({
                    columnNames: ["responsibleId"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "users",
                    onDelete: "SET NULL",
                })
            ),
            queryRunner.createForeignKey(
                "tasks",
                new TableForeignKey({
                    columnNames: ["categoryId"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "categories",
                    onDelete: "SET NULL",
                })
            )
        ])
    }


    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("tasks");
        const foreignKey = table?.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("responsibleId") !== -1
        );
        if (foreignKey) {
            await queryRunner.dropForeignKey("tasks", foreignKey);
        }

        await queryRunner.dropTable("tasks");
    }

}
