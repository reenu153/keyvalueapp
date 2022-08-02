import {MigrationInterface, QueryRunner} from "typeorm";

export class addedPassword1659441611769 implements MigrationInterface {
    name = 'addedPassword1659441611769'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "password" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "password"`);
    }

}
