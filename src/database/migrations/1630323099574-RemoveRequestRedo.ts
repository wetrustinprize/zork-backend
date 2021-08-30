import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class RemoveRequestRedo1630323099574 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropColumn("requests", "last_zorks");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.addColumn(
      "requests",
      new TableColumn({
        name: "last_zorks",
        type: "integer",
      })
    );
  }
}
