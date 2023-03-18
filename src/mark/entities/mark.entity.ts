import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { SubjectEntity } from '../../subject/entities/subject.entity';
import { StudentEntity } from '../../student/entities/student.entity';
import { BaseEntity } from '../../utils/base.entity';

export enum Marks {
  A = '5',
  B = '4',
  C = '3',
  F = '2',
}

@Entity('mark')
export class MarkEntity extends BaseEntity {
  // связь "Много к одному". много оценок по одному предмету
  @ManyToOne(() => SubjectEntity, (subject) => subject.marks)
  @JoinColumn({ name: 'subject_id' })
  subject: SubjectEntity;

  // связь "Много к одному". много оценок у одного студента
  @ManyToOne(() => StudentEntity, (student) => student.marks)
  @JoinColumn({ name: 'student_id' })
  student: StudentEntity;

  // оценка
  @Column()
  mark: Marks;
}
