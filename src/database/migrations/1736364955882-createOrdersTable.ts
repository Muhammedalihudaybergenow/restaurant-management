import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const tableName = 'orders';
const usersTableName = 'users';
const restaurantTableName = 'restaurants';
const orderTypeTableName = 'order_types';
export class CreateOrdersTable1736364955882 implements MigrationInterface {
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
            name: 'full_name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'phonenumber',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'note',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'comment',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'date',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'start_time',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'end_time',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'chair_count',
            type: 'integer',
            isNullable: false,
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
          {
            name: 'order_type_name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'created_by_id',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'updated_by_id',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'order_type_id',
            type: 'integer',
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['created_by_id'],
            referencedColumnNames: ['id'],
            referencedTableName: usersTableName,
          },
          {
            columnNames: ['restaurant_id'],
            referencedColumnNames: ['id'],
            referencedTableName: restaurantTableName,
          },
          {
            columnNames: ['updated_by_id'],
            referencedColumnNames: ['id'],
            referencedTableName: usersTableName,
          },
          {
            columnNames: ['order_type_id'],
            referencedColumnNames: ['id'],
            referencedTableName: orderTypeTableName,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(tableName);
  }
}
