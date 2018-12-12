import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1544566838254 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "organizations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "email" text NOT NULL, "phone" text NOT NULL, "approved" boolean NOT NULL DEFAULT false, "sequenceNumber" BIGSERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "version" integer NOT NULL, CONSTRAINT "PK_6b031fcd0863e3f6b44230163f9" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "skills" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "sequenceNumber" BIGSERIAL NOT NULL, "title" text NOT NULL, "description" text NOT NULL, CONSTRAINT "PK_0d3212120f4ecedf90864d7e298" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "studentProfiles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "studyProgram" text NOT NULL, "university" text NOT NULL, "user" uuid, CONSTRAINT "REL_7bdeaf32c52ed37e79202e91a6" UNIQUE ("user"), CONSTRAINT "PK_fea32f01cdb61a03ca60525cfa0" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstname" text NOT NULL, "lastname" text NOT NULL, "phone" text NOT NULL, "email" citext NOT NULL, "username" citext, "password" text NOT NULL, "sequenceNumber" BIGSERIAL NOT NULL, "siteAdmin" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "version" integer NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TYPE "jobApplications_state_enum" AS ENUM('PENDING', 'REJECTED', 'APPROVED')`
    );
    await queryRunner.query(
      `CREATE TABLE "jobApplications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "state" "jobApplications_state_enum" NOT NULL DEFAULT 'PENDING', "sequenceNumber" BIGSERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "version" integer NOT NULL, "user" uuid, "job" uuid, CONSTRAINT "PK_7de019fff1d3968233e5d354dbe" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "universities" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "UQ_25b08a78732a663bb35872eaa70" UNIQUE ("name"), CONSTRAINT "PK_8da52f2cee6b407559fdbabf59e" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "studyProgram" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, CONSTRAINT "UQ_c027602fcc864aec305c3e8dedc" UNIQUE ("title"), CONSTRAINT "PK_a18c7fc9ab9878d32175fbe4450" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "jobs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "description" text NOT NULL, "salary" float NOT NULL, "isSalaryPerHour" boolean NOT NULL DEFAULT false, "workload" float NOT NULL, "sequenceNumber" BIGSERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "version" integer NOT NULL, "start" date NOT NULL, "end" TIMESTAMP, "workingTime" integer, "isWorkingTimePerWeek" boolean DEFAULT 'true', "organizationId" uuid, CONSTRAINT "PK_cf0a6c42b72fcc7f7c237def345" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "organizations_users" ("organizationsId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_da93ab06ae4af19e3a142813950" PRIMARY KEY ("organizationsId", "usersId"))`
    );
    await queryRunner.query(
      `CREATE TABLE "bookmarks" ("usersId" uuid NOT NULL, "jobsId" uuid NOT NULL, CONSTRAINT "PK_59b0563d7b6f7758e9f369bb324" PRIMARY KEY ("usersId", "jobsId"))`
    );
    await queryRunner.query(
      `CREATE TABLE "users_skills" ("usersId" uuid NOT NULL, "skillsId" uuid NOT NULL, CONSTRAINT "PK_5e655012663719d6320c0a2a5ba" PRIMARY KEY ("usersId", "skillsId"))`
    );
    await queryRunner.query(
      `CREATE TABLE "studyProgram_university" ("studyProgramId" uuid NOT NULL, "universitiesId" uuid NOT NULL, CONSTRAINT "PK_2e84055d505051fe25869f79237" PRIMARY KEY ("studyProgramId", "universitiesId"))`
    );
    await queryRunner.query(
      `CREATE TABLE "job_studyProgram" ("jobsId" uuid NOT NULL, "studyProgramId" uuid NOT NULL, CONSTRAINT "PK_848c20edbb8d781ecce14f7675a" PRIMARY KEY ("jobsId", "studyProgramId"))`
    );
    await queryRunner.query(
      `CREATE TABLE "jobs_skills" ("jobsId" uuid NOT NULL, "skillsId" uuid NOT NULL, CONSTRAINT "PK_00889e4f99a8e183b24d6fb937a" PRIMARY KEY ("jobsId", "skillsId"))`
    );
    await queryRunner.query(
      `ALTER TABLE "studentProfiles" ADD CONSTRAINT "FK_7bdeaf32c52ed37e79202e91a62" FOREIGN KEY ("user") REFERENCES "users"("id")`
    );
    await queryRunner.query(
      `ALTER TABLE "jobApplications" ADD CONSTRAINT "FK_d18dfec3dd25114877ceb189209" FOREIGN KEY ("user") REFERENCES "users"("id")`
    );
    await queryRunner.query(
      `ALTER TABLE "jobApplications" ADD CONSTRAINT "FK_f385526e29288ca7c8d0e755096" FOREIGN KEY ("job") REFERENCES "jobs"("id")`
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" ADD CONSTRAINT "FK_08bdc8b939f39e6d55b4c38cfb9" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id")`
    );
    await queryRunner.query(
      `ALTER TABLE "organizations_users" ADD CONSTRAINT "FK_c00bc2922da6310512964d28729" FOREIGN KEY ("organizationsId") REFERENCES "organizations"("id") ON DELETE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "organizations_users" ADD CONSTRAINT "FK_b5aa17c39b722cb9bc25a3d139d" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "bookmarks" ADD CONSTRAINT "FK_b0075fdec79957795cd75fb7bb9" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "bookmarks" ADD CONSTRAINT "FK_4d0391697f8d396f21846c8784a" FOREIGN KEY ("jobsId") REFERENCES "jobs"("id") ON DELETE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "users_skills" ADD CONSTRAINT "FK_8f15d69471038e9f128fc6a1c92" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "users_skills" ADD CONSTRAINT "FK_d109e7800e9d15f4993e44f8b52" FOREIGN KEY ("skillsId") REFERENCES "skills"("id") ON DELETE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "studyProgram_university" ADD CONSTRAINT "FK_f4833af8ff06ad8eb8e1b48e124" FOREIGN KEY ("studyProgramId") REFERENCES "studyProgram"("id") ON DELETE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "studyProgram_university" ADD CONSTRAINT "FK_b2a3d37d7cacfa376d1001aabbb" FOREIGN KEY ("universitiesId") REFERENCES "universities"("id") ON DELETE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "job_studyProgram" ADD CONSTRAINT "FK_72a389ab04d5a502b636e8546fa" FOREIGN KEY ("jobsId") REFERENCES "jobs"("id") ON DELETE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "job_studyProgram" ADD CONSTRAINT "FK_b1d16e336c2d1b45d786b1b348c" FOREIGN KEY ("studyProgramId") REFERENCES "studyProgram"("id") ON DELETE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "jobs_skills" ADD CONSTRAINT "FK_3ffeca96c20aff476fac6183024" FOREIGN KEY ("jobsId") REFERENCES "jobs"("id") ON DELETE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "jobs_skills" ADD CONSTRAINT "FK_65fc67dbfa780f25446327b7e01" FOREIGN KEY ("skillsId") REFERENCES "skills"("id") ON DELETE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "jobs_skills" DROP CONSTRAINT "FK_65fc67dbfa780f25446327b7e01"`
    );
    await queryRunner.query(
      `ALTER TABLE "jobs_skills" DROP CONSTRAINT "FK_3ffeca96c20aff476fac6183024"`
    );
    await queryRunner.query(
      `ALTER TABLE "job_studyProgram" DROP CONSTRAINT "FK_b1d16e336c2d1b45d786b1b348c"`
    );
    await queryRunner.query(
      `ALTER TABLE "job_studyProgram" DROP CONSTRAINT "FK_72a389ab04d5a502b636e8546fa"`
    );
    await queryRunner.query(
      `ALTER TABLE "studyProgram_university" DROP CONSTRAINT "FK_b2a3d37d7cacfa376d1001aabbb"`
    );
    await queryRunner.query(
      `ALTER TABLE "studyProgram_university" DROP CONSTRAINT "FK_f4833af8ff06ad8eb8e1b48e124"`
    );
    await queryRunner.query(
      `ALTER TABLE "users_skills" DROP CONSTRAINT "FK_d109e7800e9d15f4993e44f8b52"`
    );
    await queryRunner.query(
      `ALTER TABLE "users_skills" DROP CONSTRAINT "FK_8f15d69471038e9f128fc6a1c92"`
    );
    await queryRunner.query(
      `ALTER TABLE "bookmarks" DROP CONSTRAINT "FK_4d0391697f8d396f21846c8784a"`
    );
    await queryRunner.query(
      `ALTER TABLE "bookmarks" DROP CONSTRAINT "FK_b0075fdec79957795cd75fb7bb9"`
    );
    await queryRunner.query(
      `ALTER TABLE "organizations_users" DROP CONSTRAINT "FK_b5aa17c39b722cb9bc25a3d139d"`
    );
    await queryRunner.query(
      `ALTER TABLE "organizations_users" DROP CONSTRAINT "FK_c00bc2922da6310512964d28729"`
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" DROP CONSTRAINT "FK_08bdc8b939f39e6d55b4c38cfb9"`
    );
    await queryRunner.query(
      `ALTER TABLE "jobApplications" DROP CONSTRAINT "FK_f385526e29288ca7c8d0e755096"`
    );
    await queryRunner.query(
      `ALTER TABLE "jobApplications" DROP CONSTRAINT "FK_d18dfec3dd25114877ceb189209"`
    );
    await queryRunner.query(
      `ALTER TABLE "studentProfiles" DROP CONSTRAINT "FK_7bdeaf32c52ed37e79202e91a62"`
    );
    await queryRunner.query(`DROP TABLE "jobs_skills"`);
    await queryRunner.query(`DROP TABLE "job_studyProgram"`);
    await queryRunner.query(`DROP TABLE "studyProgram_university"`);
    await queryRunner.query(`DROP TABLE "users_skills"`);
    await queryRunner.query(`DROP TABLE "bookmarks"`);
    await queryRunner.query(`DROP TABLE "organizations_users"`);
    await queryRunner.query(`DROP TABLE "jobs"`);
    await queryRunner.query(`DROP TABLE "studyProgram"`);
    await queryRunner.query(`DROP TABLE "universities"`);
    await queryRunner.query(`DROP TABLE "jobApplications"`);
    await queryRunner.query(`DROP TYPE "jobApplications_state_enum"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "studentProfiles"`);
    await queryRunner.query(`DROP TABLE "skills"`);
    await queryRunner.query(`DROP TABLE "organizations"`);
  }
}
