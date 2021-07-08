import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTransactions1625782764321 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "transaction",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "zorks",
            type: "integer",
          },
          {
            name: "from_id",
            type: "uuid",
          },
          {
            name: "to_id",
            type: "uuid",
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "public",
            type: "bool",
            default: true,
          },
          {
            name: "created_at",
            type: "date",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FKUserFrom",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["from_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
          {
            name: "FKUserTo",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["to_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("transaction");
  }
}
