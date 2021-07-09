import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class DescriptionTransaction1625871342730 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "transactions",
      new TableColumn({
        name: "description",
        type: "varchar",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("transaction", "description");
  }
}
