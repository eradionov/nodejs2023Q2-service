import { MigrationInterface, QueryRunner } from 'typeorm';

export class Auth1692457071376 implements MigrationInterface {
  name = 'Auth1692457071376';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "refreshToken" character varying(512)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "refreshToken"`);
  }
}
