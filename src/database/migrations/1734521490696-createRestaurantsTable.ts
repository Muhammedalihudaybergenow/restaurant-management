import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const tableName = 'restaurants';
const usersTableName = 'users';

export class CreateRestaurantsTable1734521490696 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: tableName,
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment', // Explicitly define the generation strategy
            isNullable: false,
          },
          {
            name: 'slug',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'file',
            type: 'jsonb',
            isNullable: false,
          },
          {
            name: 'user_id',
            type: 'integer',
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['user_id'],
            referencedTableName: usersTableName,
            referencedColumnNames: ['id'],
          },
        ],
        indices: [
          {
            columnNames: ['id'],
          },
          {
            columnNames: ['user_id'],
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(tableName, true);
  }
}
