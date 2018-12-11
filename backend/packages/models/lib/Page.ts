import {
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
  ManyToOne
} from "typeorm";
import { StudyProgram } from "./StudyProgram";
import { Organization } from "./Organization";

@Entity("pages")
export class Page {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToMany(type => StudyProgram)
  @JoinColumn({ name: "pages_studyPrograms" })
  studyProgramms: StudyProgram[];

  @ManyToOne(type => Organization, organization => organization.pages)
  organization: Organization;
}
