import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTsVectorTrigger1734524311862
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE OR REPLACE FUNCTION update_users_search_column() RETURNS trigger AS $$
            BEGIN
              -- Using the 'simple' text search configuration for all text fields
              NEW.search_column := 
                setweight(to_tsvector('simple', COALESCE(NEW.email, '')), 'A') ||
                setweight(to_tsvector('simple', COALESCE(NEW.phonenumber::text, '')), 'B') ||
                setweight(to_tsvector('simple', COALESCE(NEW.first_name, '')), 'C') ||
                setweight(to_tsvector('simple', COALESCE(NEW.last_name, '')), 'C');
      
              RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;
          `);

    // Attach the trigger to the users table
    await queryRunner.query(`
            CREATE TRIGGER update_search_column_trigger
            BEFORE INSERT OR UPDATE ON users
            FOR EACH ROW
            EXECUTE FUNCTION update_users_search_column();
          `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP TRIGGER IF EXISTS update_search_column_trigger ON users`,
    );
    await queryRunner.query(
      `DROP FUNCTION IF EXISTS update_users_search_column`,
    );
  }
}
