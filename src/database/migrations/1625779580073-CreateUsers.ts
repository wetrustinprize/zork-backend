import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1625779580073 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "fullname",
            type: "varchar",
          },
          {
            name: "password",
            type: "varchar",
          },
          {
            name: "email",
            type: "varchar",
          },
          {
            name: "zorks",
            type: "integer",
            default: 0,
          },
          {
            name: "created_at",
            type: "date",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "date",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
