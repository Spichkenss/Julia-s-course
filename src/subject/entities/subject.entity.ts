import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { MarkEntity } from '../../mark/entities/mark.entity';
import { TeacherEntity } from '../../teacher/entities/teacher.entity';
import { BaseEntity } from '../../utils/base.entity';

@Entity('subject')
export class SubjectEntity extends BaseEntity {
  @ManyToOne(() => TeacherEntity, (teacher) => teacher.subjects)
  teacher: TeacherEntity;

  @OneToMany(() => MarkEntity, (mark) => mark.subject)
  marks: MarkEntity[];

  @Column()
  name: string;
}
