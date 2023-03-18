import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { StudentEntity } from '../../student/entities/student.entity';
import { BaseEntity } from '../../utils/base.entity';

@Entity('visit')
export class VisitEntity extends BaseEntity {
  @ManyToOne(() => StudentEntity, (student) => student.visits)
  @JoinColumn({ name: 'student_id' })
  student: StudentEntity;
}
