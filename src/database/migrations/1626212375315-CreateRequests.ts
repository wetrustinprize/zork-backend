import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRequests1626212375315 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "requests",
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
            name: "last_zorks",
            type: "integer",
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "request_canceled",
            type: "bool",
          },
          {
            name: "request_result",
            type: "uuid",
            isNullable: true,
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
            name: "created_at",
            type: "date",
          },
          {
            name: "updated_at",
            type: "date",
          },
        ],
        foreignKeys: [
          {
            name: "FKFromUser",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["from_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
          {
            name: "FKToUser",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["to_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
          {
            name: "FKRequestResult",
            referencedTableName: "transactions",
            referencedColumnNames: ["id"],
            columnNames: ["request_result"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
        ],
      })
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("requests");
  }
}
