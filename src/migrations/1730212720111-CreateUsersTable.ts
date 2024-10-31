import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1730212720111 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "users",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                    comment: 'ИД'
                },
                {
                    name: "username",
                    type: "varchar",
                    comment: 'Имя пользователя'
                },
                {
                    name: "email",
                    type: "varchar",
                    comment: 'Email'
                },
                {
                    name: "status",
                    type: "enum",
                    enum: ["ACTIVE", "INACTIVE"],
                    default: `'ACTIVE'`,
                    comment: 'Статус пользователя'
                },
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }
}
