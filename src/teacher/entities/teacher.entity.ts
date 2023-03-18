import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { SubjectEntity } from '../../subject/entities/subject.entity';
import { BaseEntity } from '../../utils/base.entity';

@Entity('teacher')
export class TeacherEntity extends BaseEntity {
  @Column({ unique: true, name: 'unique_code' })
  uniqueCode: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @OneToMany(() => SubjectEntity, (subject) => subject.teacher)
  @JoinColumn({ name: 'teacher_id' })
  subjects: SubjectEntity[];
}
