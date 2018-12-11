import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  Column
} from "typeorm";
import { University } from "./University";
import { Job } from "./Job";

@Entity("studyProgram", { name: "studyProgram" })
export class StudyProgram {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  title: string;

  @ManyToMany(type => University)
  @JoinTable({ name: "studyProgram_university" })
  universities: University[];

  @ManyToMany(type => Job)
  jobs: Job[];
}
