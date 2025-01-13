import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const tableName = 'order_types';
const restarauntTableName = 'restaurants';
export class CreateOrderTypesTable1734525320752 implements MigrationInterface {
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
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'is_active',
            type: 'boolean',
            isNullable: false,
            default: 'true',
          },
          {
            name: 'price',
            type: 'float',
            isNullable: false,
          },
          {
            name: 'restaurant_id',
            type: 'integer',
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['restaurant_id'],
            referencedColumnNames: ['id'],
            referencedTableName: restarauntTableName,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(tableName);
  }
}
