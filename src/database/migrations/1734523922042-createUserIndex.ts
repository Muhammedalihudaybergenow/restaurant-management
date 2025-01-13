import { MigrationInterface, QueryRunner } from 'typeorm';
const tableName = 'users';
export class CreateUserIndex1734523922042 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE INDEX user_search_column_idx ON ${tableName} USING gin(search_column)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX IF EXISTS user_search_column_idx`);
  }
}
