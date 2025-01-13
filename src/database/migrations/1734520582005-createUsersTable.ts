import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const tableName = 'users';
export class CreateUsersTable1734520582005 implements MigrationInterface {
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
            name: 'is_super_user',
            type: 'boolean',
            default: 'false',
            isNullable: false,
          },
          {
            name: 'first_name',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: 'last_name',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'role',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'phonenumber',
            type: 'integer',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'created_at',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'valid_until',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'search_column',
            type: 'tsvector',
            isNullable: false,
          },
        ],
        indices: [
          {
            columnNames: ['is_super_user'],
          },
          {
            columnNames: ['phonenumber'],
          },
          {
            columnNames: ['email'],
          },
          {
            columnNames: ['valid_until'],
          },
        ],
      }),
      true,
      true,
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(tableName);
  }
}
