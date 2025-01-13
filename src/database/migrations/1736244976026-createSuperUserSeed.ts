import { UserRoleEnum, UserStatusEnum } from 'src/common/enums';
import { HashHelper } from 'src/common/utils';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSuperUserSeed1736244976026 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const hashedPassword = await HashHelper.hash('Hello123'); // Precompute the hashed password

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('users') // Use the table name directly
      .values([
        {
          created_at: new Date().getTime(), // Use Date object for timestamp
          email: 'admin@example.com',
          first_name: 'Admin',
          last_name: 'Admin',
          is_super_user: true,
          password: hashedPassword, // Insert precomputed hash
          phonenumber: 61000000,
          valid_until: '2099-01-30',
          role: UserRoleEnum.ADMIN,
          status: UserStatusEnum.ACTIVE,
        },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('users') // Use the table name directly
      .where('email = :email', { email: 'admin@example.com' })
      .orWhere('phonenumber = :phonenumber', { phonenumber: 61000000 })
      .execute();
  }
}
